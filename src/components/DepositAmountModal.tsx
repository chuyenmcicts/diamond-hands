import React, { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from 'react'

interface IProps {
  onDeposit: (amount: number) => void;
  toggleModal: () => void;
}

const Component = ({ onDeposit, toggleModal }: IProps) => {
  const [amount, setAmount] = useState('');

  const onTextChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value)
  }, [])
  const onSubmit = useCallback(() => {
    onDeposit(Number(amount))
  }, [amount, onDeposit])

  return (
    <div className='modal display-block' onClick={(e: MouseEvent<HTMLDivElement>) => {
      if( (e.target as HTMLDivElement ).classList.contains('modal')) {
        toggleModal()
      }
    }}>
      <div className='modal-main'>
        <div className="modal-header">Add RBL (Deposit ETH)</div>
        <div className='form-group'>
          <input type="text" autoFocus className="input-group" placeholder="ETH" value={amount} onChange={onTextChange} />
          <button type="button" className="custom-button btn-modal" onClick={onSubmit} >Add</button>
        </div>
      </div>
    </div>
  )
}

export default Component;
