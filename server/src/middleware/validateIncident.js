// Placeholder for incident validation middleware.

export default function validateIncident(req, res, next){
    const {title, description, severity, affectedService} = req.body

    if(!title?.trim() || !description?.trim() || !affectedService?.trim()){
        return res.status(400).json({
            message: "title, description and severity can't be empty"
        })

    }

    const allowedSeverities = [
        "low",
        "medium",
        "high",
        "critical"
    ]

    if(!allowedSeverities.includes(severity)){
        return res.status(400).json({
            message: "Invalid severity"
        })
    }
    next()
}