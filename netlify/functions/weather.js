// Netlify Function: backendda ob-havo ma'lumotini olib kelish
export async function handler(event) {
	// Query string'dan shahar nomini olamiz, bo'lmasa Tashkent bo'ladi
	const city = event.queryStringParameters?.city || 'Tashkent'

	// WeatherAPI kaliti (oddiylik uchun shu yerda qoldirildi)
	const apiKey = 'e0c4fcc2ca0449578ae35836241312'

	// Asl API manzili (backend tomondan so'rov yuboriladi)
	const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(
		city,
	)}`

	try {
		// WeatherAPI'ga so'rov yuboramiz
		const response = await fetch(url)

		// Agar status 2xx bo'lmasa, xato qaytaramiz
		if (!response.ok) {
			return {
				statusCode: response.status,
				body: JSON.stringify({
					message: "WeatherAPI dan ma'lumot olishda xatolik.",
					status: response.status,
				}),
			}
		}

		// JSON ma'lumotni o'qiymiz
		const data = await response.json()

		// Frontendga JSON qaytaramiz
		return {
			statusCode: 200,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}
	} catch (error) {
		// Backenddagi kutilmagan xatolik
		return {
			statusCode: 500,
			body: JSON.stringify({
				message: "Server tomonda kutilmagan xatolik yuz berdi.",
			}),
		}
	}
}

