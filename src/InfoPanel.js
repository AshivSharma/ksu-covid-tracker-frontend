import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import "./infoPanel.css";

function InfoPanel({title, group1_cases, group2_cases, total}) {
    return (
        <div>
            <Card className="infoPanel">
                <CardContent>
                    <Typography className="infoPanel_Title" color="textPrimary">{title}</Typography>
                    <h3 className="infoPanel_group">Student: {group1_cases}</h3>
                    <h3 className="infoPanel_group">Faculty: {group2_cases}</h3>
                    <Typography className="infoPanel_Total" color="textSecondary">Total: {total}</Typography>
                </CardContent>

            </Card>
        </div>
    )
}

export default InfoPanel
