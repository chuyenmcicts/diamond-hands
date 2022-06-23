interface IProps {
  image: string;
  balance: number;
  value: number;
  percent: number;
  className: string;
  name: string;
  unit: string;
}

const Component = ({ image, balance, value, percent, className, name, unit }: IProps) => {

  return (
    <>
      <tr>
        <td><img src={image} alt="" height='20' width='20' /> {name}</td>
        <td>{percent}%</td>
      </tr>
      <tr>
        <td>{balance} {unit}</td>
        <td>${value}</td>
      </tr>
      <tr>
        <td colSpan={2}>
          <div className="progress-bar-container">
            <div className={`${className}`} style={{ width: `${percent}%` }}></div>
          </div>
        </td>
      </tr>

    </>
  )
}

export default Component;
