import { useEffect, useState } from 'react'
import './Weather.css'
import HourWeatherCard from './WeatherCon'

export default function Weather() {
	const [weatherData, setWeatherData] = useState(null)
	const [error, setError] = useState(null)

	useEffect(() => {
		fetch('/.netlify/functions/weather?city=Tashkent')
			.then(response => {
				if (!response.ok) {
					throw new Error(`Serverdan xato status qaytdi: ${response.status}`)
				}
				return response.json()
			})
			.then(data => {
				if (data?.error) {
					throw new Error(data.error)
				}
				setWeatherData(data)
			})
			.catch(err => {
				console.error('Error fetching data:', err)
				setError(err?.message || "Ma'lumotni olishda xatolik yuz berdi")
			})
	}, [])

	if (error) {
		return (
			<div className='page'>
				<div className='container'>
					<div className='status-card error'>Xatolik: {error}</div>
				</div>
			</div>
		)
	}

	// Yuklanish
	if (!weatherData) {
		return (
			<div className='page'>
				<div className='container'>
					<div className='status-card'>Yuklanmoqda...</div>
				</div>
			</div>
		)
	}

	return (
		<div className='page'>
			<div className='container'>
				<div className='main-card'>
					<div className='title-row'>
						<div>
							<h2 className='city'>
								{weatherData?.location?.name || 'Noma’lum shahar'}
							</h2>
							<p className='region'>
								{weatherData?.location?.country ||
									weatherData?.location?.region ||
									''}
							</p>
						</div>
					</div>

					<div className='main-row'>
						{weatherData?.current?.condition?.icon && (
							<img
								className='main-icon'
								src={`https:${weatherData.current.condition.icon}`}
								alt={weatherData?.current?.condition?.text || 'Ob-havo'}
							/>
						)}

						<div className='main-texts'>
							<p className='temperature'>
								{typeof weatherData?.current?.temp_c === 'number'
									? `${weatherData.current.temp_c}°C`
									: '---'}
							</p>
							<p className='condition'>
								{weatherData?.current?.condition?.text || 'Ob-havo'}
							</p>
						</div>
					</div>
				</div>

				<div className='hourly-block'>
					<h3 className='hourly-title'>24 soatlik ob-havo</h3>

					<div className='hourly-list'>
						{weatherData?.forecast?.forecastday?.[0]?.hour?.map(hourData => (
							<HourWeatherCard key={hourData?.time_epoch} hourData={hourData} />
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
