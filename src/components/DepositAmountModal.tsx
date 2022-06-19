import React, { ChangeEvent, useCallback, useState } from 'react'

interface IProps {
  onDeposit: (amount: number) => void;
}

const Component = ({onDeposit}: IProps) => {
  const [amount, setAmount] = useState('');

  const onTextChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value)
  }, [])
  const onSubmit = useCallback(() => {
    onDeposit(Number(amount))
  }, [amount, onDeposit])

  return (
    <div>
      <input type="text" value={amount} onChange={onTextChange} />
      <button type="button" className="btn btn-primary" onClick={onSubmit} >Submit</button>
    </div>
  )
}

export default Component;
