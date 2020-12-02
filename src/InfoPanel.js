import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import "./infoPanel.css";
import CountUp from 'react-countup';

function InfoPanel({title,group1_title, group2_title, group1_cases, group2_cases, total}) {
    return (
        <div>
            <Card className="infoPanel">
                <CardContent>
                    <Typography className="infoPanel_Title" color="textPrimary">{title}</Typography>
                    <h3 className="infoPanel_group">{group1_title}: {}
                    <CountUp start={0} end={group1_cases} duration={2.75} separator="," />
                    </h3>
                    <h3 className="infoPanel_group">{group2_title}: { }
                    <CountUp start={0} end={group2_cases} duration={2.75} separator="," />
                    </h3>
                    <Typography className="infoPanel_Total" color="textSecondary">Total: {total}</Typography>
                </CardContent>

            </Card>
        </div>
    )
}

export default InfoPanel
