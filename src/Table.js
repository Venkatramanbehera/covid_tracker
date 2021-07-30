import React from 'react'
import './Table.css'

const Table = (props) => {
    const { countries } = props

    return (
        <div className="table">
            <table className="table__data">
                <tbody>
                {
                    countries.map(({ country, cases}) => {
                        return <tr key={ country }>
                            <td>{ country }</td>
                            <td>{ cases }</td>
                        </tr>
                    })
                }
                </tbody>
            </table>
        </div>
    )
}

export default Table
