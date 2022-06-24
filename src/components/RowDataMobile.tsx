interface IProps {
  image: string;
  balance: string;
  value: string;
  percent: number;
  className: string;
  name: string;
  unit: string;
}

const Component = ({ image, balance, value, percent, className, name, unit }: IProps) => {

  return (
    <>
      <tbody>
        <tr>
          <td><img src={image} alt="" height='20' width='20' /> {name}</td>
          <td className="data-right">{percent}%</td>
        </tr>
        <tr>
          <td className="data-left">{balance} {unit}</td>
          <td className="data-right">${value}</td>
        </tr>
        <tr>
          <td colSpan={2}>
            <div className="progress-bar-container data-left">
              <div className={`${className}`} style={{ width: `${percent}%` }}></div>
            </div>
          </td>
        </tr>

      </tbody>
    </>
  )
}

export default Component;
