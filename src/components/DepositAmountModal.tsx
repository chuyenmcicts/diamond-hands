import React, { ChangeEvent, useCallback, useState } from 'react'

interface IProps {
  onDeposit: (amount: number) => void;
  show: boolean;
  handleClose: () => void;
}

const Component = ({ onDeposit, show, handleClose }: IProps) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  const [amount, setAmount] = useState('');

  const onTextChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value)
  }, [])
  const onSubmit = useCallback(() => {
    onDeposit(Number(amount))
  }, [amount, onDeposit])

  return (
    <div className={showHideClassName}>
      <div className='modal-main'>
        <div className='form-group'>
          <input type="text" autoFocus className='input-group' value={amount} onChange={onTextChange} />
          <button type="button" className="btn btn-primary btn-modal" onClick={onSubmit} >Submit</button>
        </div>
        <div className='container-button-close'>
          <button type="button" className='button-content custom-button' onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default Component;
