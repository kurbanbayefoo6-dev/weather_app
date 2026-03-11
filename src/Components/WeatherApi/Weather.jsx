import { useEffect, useState } from 'react'
import './Weather.css'
// Pastdagi soatlik kichik kartochka komponenti
import HourWeatherCard from './WeatherCon'

export default function Weather() {
	// API'dan keladigan umumiy ob-havo ma'lumoti
	const [weatherData, setWeatherData] = useState(null)

	// Yuklanish holati (loading)
	const [isLoading, setLoading] = useState(true)

	// Xatolik holati (error)
	// const [error, setError] = useState(null)

	const apiUrl =
		'https://api.weatherapi.com/v1/forecast.json?q=Tashkent&key=e0c4fcc2ca0449578ae35836241312'

	useEffect(() => {
		// Komponent birinchi marta ochilganda ma'lumotni olib kelamiz
		async function fetchWeatherData() {
			// Har bir so'rov boshida holatlarni tozalab olamiz
			setLoading(true)
			// setError(null)

			try {
				// API'ga so'rov yuboramiz
				const response = await fetch(apiUrl)

				// Agar server xato qaytarsa
				if (!response.ok) {
					throw new Error("API'dan javob kelmadi (status xato).")
				}

				// JSON ma'lumotni o'qiymiz
				const data = await response.json()

				// State'ga saqlaymiz
				setWeatherData(data)
			// } catch (err) {
				// Xatoni userga ko'rsatish uchun state'ga yozamiz
				// setError(err?.message || "Noma'lum xatolik yuz berdi.")
			} finally {
				// Har qanday holatda loading'ni o'chiramiz
				setLoading(false)
			}
		}

		fetchWeatherData()
	}, [])

	// Loading holati
	if (isLoading) {
		return (
			<div className='page'>
				<div className='container'>
					<div className='status-card'>Yuklanmoqda...</div>
				</div>
			</div>
		)
	}

	// Error holati
	// if (error) {
	// 	return (
	// 		<div className='page'>
	// 			<div className='container'>
	// 				<div className='status-card error'>Xatolik: {error}</div>
	// 			</div>
	// 		</div>
	// 	)
	// }

	// Ma'lumot kelmagan bo'lsa (himoya)
	// if (!weatherData) {
	// 	return (
	// 		<div className='page'>
	// 			<div className='container'>
	// 				<div className='status-card'>Ma'lumot topilmadi.</div>
	// 			</div>
	// 		</div>
	// 	)
	// }

	// API'dan kerakli bo'limlarni ajratib olamiz (himoya bilan)
	const city = weatherData?.location?.name || '---'
	const regionOrCountry =
		weatherData?.location?.country || weatherData?.location?.region || '---'

	const temperature = weatherData?.current?.temp_c
	const conditionText = weatherData?.current?.condition?.text || '---'
	const icon = weatherData?.current?.condition?.icon

	// Soatlik ma'lumotlar ro'yxati
	const hourlyList = weatherData?.forecast?.forecastday?.[0]?.hour || []

	return (
		// Butun sahifa markazda turishi uchun
		<div className='page'>
			<div className='container'>
				{/* Tepada katta current weather kartasi */}
				<div className='main-card'>
					{/* Shahar va hudud */}
					<div className='title-row'>
						<div>
							<h2 className='city'>{city}</h2>
							<p className='region'>{regionOrCountry}</p>
						</div>
					</div>

					{/* Icon, harorat va holat matni */}
					<div className='main-row'>
						{/* Icon (agar mavjud bo'lsa) */}
						{icon ? (
							<img
								className='main-icon'
								src={`https:${icon}`}
								alt={conditionText}
							/>
						) : null}

						<div className='main-texts'>
							{/* Harorat */}
							<p className='temperature'>
								{typeof temperature === 'number' ? `${temperature}°C` : '---'}
							</p>

							{/* Ob-havo holati */}
							<p className='condition'>{conditionText}</p>
						</div>
					</div>
				</div>

				{/* Pastda soatlik ob-havo kartochkalari */}
				<div className='hourly-block'>
					<h3 className='hourly-title'>Soatlik ob-havo</h3>

					{/* Hourly ro'yxatni map qilamiz va har birini ObHavoKarti'ga yuboramiz */}
					<div className='hourly-list'>
						{hourlyList.map(hourData => (
							<HourWeatherCard
								// Har bir element uchun unique key (vaqt bo'yicha)
								key={hourData?.time_epoch || hourData?.time}
								// Prop nomi o'zbekcha bo'lsin
								hourData={hourData}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
