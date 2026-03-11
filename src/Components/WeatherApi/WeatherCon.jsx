import './WeatherCon.css'

export default function HourWeatherCard({ hourData }) {
	// Himoya: prop kelmasa, hech narsa chizmaymiz
	if (!hourData) return null

	// Vaqt (API format: "2026-03-11 14:00") -> "14:00"
	const timeText = (() => {
		const rawTime = hourData?.time
		if (!rawTime) return '--:--'
		const parts = String(rawTime).split(' ')
		return parts[1] || '--:--'
	})()

	// Harorat va icon
	const temperature = hourData?.temp_c
	const icon = hourData?.condition?.icon
	const conditionText = hourData?.condition?.text || 'Ob-havo'

	return (
		// Kichik soatlik kartochka
		<div className="hour-card">
			{/* Vaqt */}
			<p className="hour-time">{timeText}</p>

			{/* Icon (agar mavjud bo'lsa) */}
			{icon ? (
				<img className="hour-icon" src={`https:${icon}`} alt={conditionText} />
			) : null}

			{/* Harorat */}
			<p className="hour-temperature">
				{typeof temperature === 'number' ? `${temperature}°` : '---'}
			</p>
		</div>
	)
}
