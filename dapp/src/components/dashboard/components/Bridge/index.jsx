import React, { Component } from 'react'
import Balance from 'components/dashboard/components/Balance'
import Message from 'components/common/SignMessage'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { BigNumber } from 'bignumber.js'
import * as actions from 'actions/bridge'
import { getBlockNumber } from 'actions/network'
import { getBalances } from 'selectors/accounts'
import arrow1 from 'images/arrow--1.svg'
import arrow2 from 'images/arrow--2.svg'
import { convertNetworkName } from 'utils/network'
import { getTransaction } from 'selectors/transaction'
import { loadModal } from 'actions/ui'
import { SHOW_MORE_MODAL } from 'constants/uiConstants'
import FuseLoader from 'images/loader-fuse.gif'
import { formatWei, toWei } from 'utils/format'
import { getBridgeStatus, getHomeNetworkType } from 'selectors/network'

class Bridge extends Component {
  state = {
    transferAmount: ''
  }

  componentDidUpdate (prevProps) {
    if (this.props.waitingForConfirmation && !prevProps.waitingForConfirmation) {
      if (this.props.bridgeStatus.to.bridge === 'home') {
        this.props.watchHomeBridge(this.props.community.homeBridgeAddress, this.props.transactionHash)
      } else {
        this.props.watchForeignBridge(this.props.community.foreignBridgeAddress, this.props.transactionHash)
      }
    }

    if (!this.props.transferStatus && prevProps.transferStatus) {
      this.setState({ transferAmount: '' })
    }
  }

  setTransferAmount = (e) => this.setState({ transferAmount: e.target.value })

  handleTransfer = () => {
    const value = toWei(this.state.transferAmount, this.props.decimals)
    if (this.props.bridgeStatus.to.bridge === 'home') {
      this.props.transferToHome(this.props.community.foreignTokenAddress, this.props.community.foreignBridgeAddress, value)
    } else {
      this.props.transferToForeign(this.props.community.homeTokenAddress, this.props.community.homeBridgeAddress, value)
    }
    this.props.getBlockNumber(this.props.bridgeStatus.to.network, this.props.bridgeStatus.to.bridge)
    this.props.getBlockNumber(this.props.bridgeStatus.from.network, this.props.bridgeStatus.from.bridge)
  }

  openModal = (side) => {
    const {
      loadModal,
      bridgeStatus,
      tokenName,
      community
    } = this.props

    const {
      foreignTokenAddress,
      homeTokenAddress,
      homeBridgeAddress,
      foreignBridgeAddress
    } = community

    loadModal(SHOW_MORE_MODAL, {
      name: convertNetworkName(bridgeStatus[side].network),
      network: bridgeStatus[side].network !== 'fuse' ? `https://api.infura.io/v1/jsonrpc/${bridgeStatus[side].network}` : CONFIG.web3.fuseProvider,
      homeTokenAddress,
      foreignTokenAddress,
      homeBridgeAddress,
      foreignBridgeAddress,
      tokenName
    })
  }

  render () {
    const {
      balances,
      homeNetwork,
      bridgeStatus,
      accountAddress,
      symbol,
      decimals,
      transferStatus,
      waitingForConfirmation,
      confirmationNumber,
      confirmationsLimit,
      tokenOfCommunityOnCurrentSide,
      isAdmin,
      community,
      waitingForRelayEvent,
      bridgeSignature
    } = this.props

    const {
      homeTokenAddress,
      foreignTokenAddress
    } = community

    const {
      transferAmount
    } = this.state

    const balance = balances[tokenOfCommunityOnCurrentSide]
    const formatted = formatWei(balance, 2, decimals)

    return (
      <div className='content__bridge__wrapper'>
        <div className='content__bridge__container'>
          <Balance
            isAdmin={isAdmin}
            accountAddress={accountAddress}
            symbol={symbol}
            decimals={decimals}
            balance={balances[homeNetwork === bridgeStatus.from.network ? homeTokenAddress : foreignTokenAddress]}
            bridgeSide={bridgeStatus.from}
            openModal={() => this.openModal('from')}
          />
          <div className='bridge__arrow'>
            <img src={homeNetwork === bridgeStatus.from.network ? arrow1 : arrow2} />
          </div>
          <div className='bridge__transfer'>
            <div className='bridge__transfer__form'>
              <input type='number' value={transferAmount} max={formatted} placeholder='0' onChange={this.setTransferAmount} disabled={transferStatus} />
              <div className='bridge__transfer__form__currency'>{symbol}</div>
            </div>
            <button disabled={transferStatus || !Number(transferAmount) || !accountAddress || BigNumber(transferAmount).multipliedBy(10 ** decimals).isGreaterThan(new BigNumber(balance))}
              className='bridge__transfer__form__btn' onClick={this.handleTransfer}>
              {transferStatus || `Transfer to ${bridgeStatus.to.network}`}
            </button>
          </div>
          <div className='bridge__arrow'>
            <img src={homeNetwork === bridgeStatus.to.network ? arrow1 : arrow2} />
          </div>
          <Balance
            isAdmin={isAdmin}
            accountAddress={accountAddress}
            symbol={symbol}
            decimals={decimals}
            balance={balances[homeNetwork === bridgeStatus.to.network ? homeTokenAddress : foreignTokenAddress]}
            bridgeSide={bridgeStatus.to}
            openModal={() => this.openModal('to')}
          />
        </div>

        <Message isOpen={bridgeSignature} isDark />
        {
          waitingForConfirmation
            ? (
              <div className='bridge-deploying'>
                <p className='bridge-deploying-text'>Pending<span>.</span><span>.</span><span>.</span></p>
                <p className='bridge-deploying__loader'><img src={FuseLoader} alt='Fuse loader' /></p>
                <div className='bridge-deploying-confirmation'>
                  Confirmations
                  <div>{confirmationNumber || '0'} / {confirmationsLimit}</div>
                </div>
              </div>
            ) : null
        }

        {
          waitingForRelayEvent
            ? (
              <div className='bridge-deploying'>
                <p className='bridge-deploying-text'>Waiting for bridge<span>.</span><span>.</span><span>.</span></p>
                <p className='bridge-deploying__loader'><img src={FuseLoader} alt='Fuse loader' /></p>
              </div>
            ) : null
        }
      </div>
    )
  }
}

Bridge.propTypes = {
  accountAddress: PropTypes.string,
  homeTokenAddress: PropTypes.string,
  foreignTokenAddress: PropTypes.string,
  networkType: PropTypes.string
}

const BridgeContainer = (props) => {
  const {
    relayEvent,
    transactionStatus,
    confirmationNumber,
    confirmationsLimit
  } = props
  const isConfirmed = () => confirmationsLimit <= confirmationNumber
  const isSent = () => transactionStatus === 'PENDING' || transactionStatus === 'SUCCESS'

  const isWaitingForConfirmation = () => isSent() && !isConfirmed()

  const getTransferStatus = () => {
    if (transactionStatus === 'PENDING') {
      return 'PENDING'
    }

    if (transactionStatus === 'SUCCESS') {
      if (!isConfirmed()) {
        return 'WAITING FOR CONFIRMATION'
      }
      if (!relayEvent) {
        return 'WAITING FOR BRIDGE'
      }
    }
  }

  return (
    <Bridge
      {...props}
      waitingForConfirmation={isWaitingForConfirmation()}
      transferStatus={getTransferStatus()}
      waitingForRelayEvent={getTransferStatus() === 'WAITING FOR BRIDGE'}
    />
  )
}

const mapStateToProps = (state) => ({
  ...state.screens.bridge,
  homeNetwork: getHomeNetworkType(state),
  balances: getBalances(state),
  bridgeStatus: getBridgeStatus(state),
  ...getTransaction(state, state.screens.bridge.transactionHash)
})

const mapDispatchToProps = {
  ...actions,
  getBlockNumber,
  loadModal
}

export default connect(mapStateToProps, mapDispatchToProps)(BridgeContainer)
