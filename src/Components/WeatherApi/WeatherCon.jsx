import './WeatherCon.css'

export default function HourWeatherCard({ hourData }) {
	if (!hourData) return null

	const timeText = (() => {
		const rawTime = hourData.time
		if (!rawTime) return '--:--'
		const parts = String(rawTime).split(' ')
		return parts[1] || '--:--'
	})()

	return (
		<div className='hour-card'>
			<p className='hour-time'>{timeText}</p>
			{hourData.condition.icon ? (
				<img
					className='hour-icon'
					src={`https:${hourData.condition.icon}`}
					alt={hourData.condition.text}
				/>
			) : null}
			<p className='hour-temperature'>
				{`${hourData.temp_c}°`}
			</p>
		</div>
	)
}
