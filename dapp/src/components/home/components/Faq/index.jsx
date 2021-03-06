import React from 'react'
import faqItems from 'constants/faq'
import arrow from 'images/arrow_3.svg'

export default () => {
  return (
    <div className='faq__wrapper'>
      <div className='grid-x align-justify align-middle'>
        <h3 className='faq__title faq__title--main'>FAQ</h3>
        <a href='https://docs.fuse.io/the-fuse-studio/faq' target='_blank' rel='noopener noreferrer' className='faq__action'>
          Learn more&nbsp;<img src={arrow} alt='arrow' />
        </a>
      </div>
      {faqItems.map(({ question, link }, index) => (
        <div className='faq' key={index}>
          <h4 className='faq__title'>Q:&nbsp;&nbsp;</h4>
          <a className='faq__content' href={link} target='_blank' rel='noopener noreferrer'>{question}</a>
          <br />
        </div>
      ))}
    </div>
  )
}
