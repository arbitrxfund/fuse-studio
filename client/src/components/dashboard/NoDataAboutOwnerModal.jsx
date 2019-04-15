import React from 'react'
import PropTypes from 'prop-types'
import GenericModal from 'components/dashboard/GenericModal'

class NoDataAboutOwnerModal extends React.Component {
  handleClose = () => {
    this.props.hideModal()
    if (this.props.handleClose) {
      this.props.handleClose()
    }
  }

  handleButton = () => {
    this.handleClose()
  }

  render () {
    const content = {
      title: 'Owner choose to stay anonymous and not provide us its details',
      buttonText: 'Got it'
    }
    return (
      <GenericModal
        hideModal={this.handleClose}
        content={content}
        buttonAction={this.handleButton}
      />
    )
  }
}

NoDataAboutOwnerModal.propTypes = {
}

export default NoDataAboutOwnerModal
