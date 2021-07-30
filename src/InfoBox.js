import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import './InfoBox.css'

const InfoBox = (props) => {
    const { title, cases, total } = props
    return (
        <Card className="infoBox">
            <CardContent>
                <Typography color="textSecondary" className="infoBox__title">
                    { title }
                </Typography>
                <h2 className="infoBox__cases"> { cases } </h2>
                <Typography color="textSecondary" className="infoBox__total">
                    { total } Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox