interface IProps {
  image: string;
  balance: string;
  value: string;
  price: string;
  percent: string;
  className: string;
  name: string;
  unit: string;
}

const Component = ({ image, balance, value, price, percent, className, name, unit }: IProps) => {

  return (
    <>
      <tbody>
        <tr>
          <td><img src={image} alt="" height='20' width='20' /> {name}</td>
          <td>{balance} {unit}</td>
          <td>${value}</td>
          <td>${price}</td>
          <td>{percent}%</td>
        </tr>
        <tr>
          <td colSpan={5}>
            <div className="progress-bar-container">
              <div className={`${className}`} style={{ width: `${percent}%` }}>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </>
  )
}

export default Component;
