import React, { Fragment, useEffect, useMemo, useCallback } from 'react'
import { connect } from 'react-redux'
import { BigNumber } from 'bignumber.js'
import { getAccountAddress } from 'selectors/accounts'
import { createTokenWithMetadata, fetchDeployProgress, deployExistingToken, clearTransaction } from 'actions/token'
import { signUpUser } from 'actions/user'
import { loadModal } from 'actions/ui'
import { FAILURE } from 'actions/constants'
import WizardShape from 'utils/validation/shapes/wizard'
import * as Sentry from '@sentry/browser'
import { push } from 'connected-react-router'
import { toChecksumAddress } from 'web3-utils'

import CommunityTypes from 'constants/communityTypes'
import { existingTokens } from 'constants/existingTokens'
import { loadState } from 'utils/storage'
import { getForeignNetwork } from 'selectors/network'

import { withNetwork } from 'containers/Web3'
import withTracker from 'containers/withTracker'
import Message from 'components/common/SignMessage'
import Wizard from 'components/wizard/container'
import NameAndEmail from 'components/wizard/pages/NameAndEmail'
import ChooseCurrencyType from 'components/wizard/pages/ChooseCurrencyType'
import ChooseNetwork from 'components/wizard/pages/ChooseNetwork'
import DetailsStep from 'components/wizard/pages/DetailsStep'
import SummaryStep from 'components/wizard/pages/SummaryStep'
import DeployProgressStep from 'components/wizard/pages/DeployProgress'
import Congratulations from 'components/wizard/components/Congratulations'

import contractIcon from 'images/contract.svg'
import BridgeIcon from 'images/Bridge.svg'

const getInitialValues = (templateId, networkType) => {
  const networkState = loadState('state.network') || CONFIG.web3.bridge.network
  const { foreignNetwork } = networkState
  switch (templateId) {
    case '1':
      return {
        plugins: {
          businessList: {
            isActive: true
          },
          joinBonus: {
            isActive: true
          }
        },
        existingToken: existingTokens(networkType || foreignNetwork)[0],
        communitySymbol: existingTokens(networkType || foreignNetwork)[0].symbol
      }
    case '2':
      return {
        plugins: {
          businessList: {
            isActive: true
          },
          joinBonus: {
            isActive: true
          }
        },
        communityType: CommunityTypes[0],
        totalSupply: 1000
      }
    default:
      return {}
  }
}

const WizardPage = ({
  deployExistingToken,
  createTokenWithMetadata,
  signUpUser,
  adminAddress,
  networkType,
  transactionStatus,
  error,
  createTokenSignature,
  clearTransaction,
  loadModal,
  communityAddress,
  foreignNetwork,
  push,
  templateId
}) => {
  useEffect(() => {
    if (window && window.analytics) {
      window.analytics.track('Wizard init')
    }
  }, [])

  const initialTemplateValues = useCallback(getInitialValues(templateId, networkType), [templateId, networkType])

  const initialValues = useMemo(() => {
    const {
      plugins,
      communityType,
      existingToken,
      communitySymbol,
      totalSupply
    } = initialTemplateValues
    return {
      communityName: '',
      communitySymbol: communitySymbol || '',
      totalSupply: totalSupply || '',
      communityType: communityType || undefined,
      existingToken: existingToken || undefined,
      description: '',
      customToken: '',
      isOpen: true,
      subscribe: true,
      email: '',
      coverPhoto: {},
      images: {
        chosen: 'defaultOne'
      },
      contracts: {
        community: {
          label: 'Members list',
          checked: true,
          key: 'community',
          icon: contractIcon
        },
        bridge: {
          label: 'Bridge to fuse',
          checked: true,
          key: 'bridge',
          icon: BridgeIcon
        },
        transferOwnership: {
          checked: true,
          key: 'transferOwnership'
        },
        funder: {
          checked: true,
          key: 'funder'
        },
        email: {
          checked: true,
          key: 'email'
        }
      },
      plugins: {
        businessList: {
          isActive: false
        },
        joinBonus: {
          isActive: false
        },
        onramp: {
          isActive: false
        },
        ...plugins
      }
    }
  }, [initialTemplateValues])

  const setIssuanceTransaction = (values) => {
    const {
      communityName,
      communitySymbol,
      totalSupply,
      isOpen,
      communityType,
      contracts,
      images,
      existingToken,
      customToken,
      email,
      subscribe,
      plugins,
      coverPhoto,
      description
    } = values

    const chosenPlugins = Object.keys(plugins)
      .filter((pluginName) => plugins[pluginName].isActive)
      .reduce((newPlugins, name) => ({
        ...newPlugins,
        [name]: {
          isActive: plugins[name].isActive,
          name
        }
      }), {})

    const steps = Object.keys(contracts)
      .filter((contractName) => contracts[contractName].checked)
      .reduce((steps, contractName) => ({
        ...steps,
        [contracts[contractName].key]: contracts[contractName].key === 'bridge'
          ? { args: { foreignTokenAddress: null } }
          : contracts[contractName].key === 'community'
            ? { args: { isClosed: !isOpen, name: communityName, adminAddress, plugins: chosenPlugins, description } }
            : contracts[contractName].key === 'email'
              ? { args: { email, subscribe } }
              : {}
      }), {})

    const { chosen } = images
    const metadata = chosen !== 'custom' && !existingToken
      ? { isDefault: true, image: images && images[chosen] && images[chosen].blob, coverPhoto: coverPhoto.blob }
      : { image: images && images[chosen] && images[chosen].blob, coverPhoto: coverPhoto.blob }

    Sentry.configureScope((scope) => {
      scope.setUser({ email })
    })

    const sentry = { tags: { issuance: true } }
    if (existingToken && existingToken.label && existingToken.value) {
      const { value: foreignTokenAddress } = existingToken
      const newSteps = { ...steps, bridge: { args: { foreignTokenAddress, isCustom: false } } }
      deployExistingToken(metadata, newSteps, { sentry })
    } else if (customToken) {
      const newSteps = { ...steps, bridge: { args: { foreignTokenAddress: toChecksumAddress(customToken), isCustom: true } } }
      deployExistingToken(metadata, newSteps, { sentry })
    } else {
      const tokenData = {
        name: communityName,
        symbol: communitySymbol,
        totalSupply: new BigNumber(totalSupply).multipliedBy(1e18)
      }

      createTokenWithMetadata(tokenData, metadata, communityType.value, steps, { desiredNetworkType: foreignNetwork, sentry })
    }

    signUpUser(email, subscribe)
  }

  const goToDashboard = () => {
    push(`/view/community/${communityAddress}/justCreated`)
  }

  const transactionDenied = () => {
    return transactionStatus && transactionStatus === 'FAILURE' && error && typeof error.includes === 'function' && error.includes('denied')
  }

  return (
    <Fragment>
      <Wizard
        push={push}
        adminAddress={adminAddress}
        networkType={networkType}
        foreignNetwork={foreignNetwork}
        loadModal={loadModal}
        transactionStatus={transactionStatus}
        createTokenSignature={createTokenSignature}
        validationSchema={WizardShape}
        initialValues={initialValues}
        submitHandler={(values, actions) => {
          setIssuanceTransaction(values)
          actions.setSubmitting(false)
        }}
      >
        <Wizard.Page>
          <NameAndEmail />
        </Wizard.Page>
        <Wizard.Page>
          <ChooseNetwork />
        </Wizard.Page>
        <Wizard.Page>
          <ChooseCurrencyType />
        </Wizard.Page>
        <Wizard.Page>
          <DetailsStep networkType={networkType} />
        </Wizard.Page>
        <Wizard.Page isSubmitStep={Boolean(true).toString()}>
          <SummaryStep foreignNetwork={foreignNetwork} />
        </Wizard.Page>
        <Wizard.Page>
          <DeployProgressStep />
        </Wizard.Page>
        <Wizard.Page>
          <Congratulations networkType={networkType} goToDashboard={goToDashboard} />
        </Wizard.Page>
      </Wizard>

      <Message
        radiusAll
        issue
        isOpen={createTokenSignature}
        message='Pending'
        isDark
      />

      <Message
        issue
        message={'Oh no'}
        subTitle={`You reject the action, That’s ok, try next time!`}
        isOpen={transactionDenied()}
        clickHandler={() => clearTransaction()}
      />

      <Message
        radiusAll
        issue
        isOpen={transactionStatus === FAILURE}
        message='Something went wrong'
        clickHandler={() => clearTransaction()}
        subTitle='Try again later'
      />
    </Fragment>
  )
}

const mapStateToProps = (state, { match }) => ({
  templateId: match.params.templateId,
  ...state.screens.issuance,
  foreignNetwork: getForeignNetwork(state),
  adminAddress: getAccountAddress(state)
})

const mapDispatchToProps = {
  createTokenWithMetadata,
  fetchDeployProgress,
  deployExistingToken,
  signUpUser,
  clearTransaction,
  loadModal,
  push
}

export default withTracker(withNetwork(connect(mapStateToProps, mapDispatchToProps)(WizardPage)))
