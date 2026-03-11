import { useEffect, useState } from 'react'
import './Weather.css'
import HourWeatherCard from './WeatherCon'

export default function Weather() {
	const [weatherData, setWeatherData] = useState(null)
	const [error, setError] = useState(null)

	useEffect(() => {
		fetch('/api/v1/forecast.json?key=e0c4fcc2ca0449578ae35836241312&q=Tashkent')
			.then(res => res.json())
			.then(data => {
				console.log(data)
				setWeatherData(data)
			})
			.catch(err => {
				console.error('Error fetching data:', err)
				setError("Ma'lumotni olishda xatolik yuz berdi")
			})
	}, [])

	// Error
	if (error) {
		return (
			<div className='page'>
				<div className='container'>
					<div className='status-card error'>Xatolik: {error}</div>
				</div>
			</div>
		)
	}

	// Loading
	if (!weatherData) {
		return (
			<div className='page'>
				<div className='container'>
					<div className='status-card'>Yuklanmoqda...</div>
				</div>
			</div>
		)
	}

	const icon = weatherData.current.condition.icon
	return (
		<div className='page'>
			<div className='container'>
				<div className='main-card'>
					<div className='title-row'>
						<div>
							<h2 className='city'>{weatherData.location.name}</h2>
							<p className='region'>
								{weatherData.location.country || weatherData.location.region}
							</p>
						</div>
					</div>

					<div className='main-row'>
						{icon && (
							<img className='main-icon' src={`https:${icon}`} alt={icon} />
						)}

						<div className='main-texts'>
							<p className='temperature'>{weatherData.current.temp_c}°C</p>
							<p className='condition'>{weatherData.current.condition.text}</p>
						</div>
					</div>
				</div>

				{/* Soatlik ob-havo */}
				<div className='hourly-block'>
					<h3 className='hourly-title'>24 Soatli ob-Xova</h3>

					<div className='hourly-list'>
						{weatherData.forecast.forecastday?.[0]?.hour.map(hourData => (
							<HourWeatherCard key={hourData.time_epoch} hourData={hourData} />
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
