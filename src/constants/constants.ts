import { Gender } from './enums'

export const LANGUAGE_CODE = {
	vi: 'vi',
	ja: 'ja',
	en: 'en',
}

export const FontFamily = {
	Manrope: 'Manrope',
	Manrope300: 'Manrope-Light',
	Manrope400: 'Manrope-Regular',
	Manrope500: 'Manrope-Medium',
	Manrope600: 'Manrope-SemiBold',
	Manrope700: 'Manrope-Bold',
	Manrope800: 'Manrope-ExtraBold',
	Manrope800Italic: 'Manrope-ExtraBoldItalic',
}

export const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const REGEX_PASSWORD = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]{8,}$/

export const REGEX_PHONE = /^\+?\d{1,15}$/

export const CHART_COLORS = ['#00BEA1', '#4263EB', '#FFA734', '#FF5C5C', '#B64AE9']

export const NATIONAL_CODES = [
	// { id: 1, name: '+1 (United States, Canada)' },
	// { id: 2, name: '+7 (Russia, Kazakhstan)' },
	// { id: 3, name: '+20 (Egypt)' },
	// { id: 4, name: '+27 (South Africa)' },
	// { id: 5, name: '+30 (Greece)' },
	// { id: 6, name: '+31 (Netherlands)' },
	// { id: 7, name: '+32 (Belgium)' },
	// { id: 8, name: '+33 (France)' },
	// { id: 9, name: '+34 (Spain)' },
	// { id: 10, name: '+36 (Hungary)' },
	// { id: 11, name: '+39 (Italy)' },
	// { id: 12, name: '+40 (Romania)' },
	// { id: 13, name: '+41 (Switzerland)' },
	// { id: 14, name: '+44 (United Kingdom)' },
	// { id: 15, name: '+45 (Denmark)' },
	// { id: 16, name: '+46 (Sweden)' },
	// { id: 17, name: '+47 (Norway)' },
	// { id: 18, name: '+48 (Poland)' },
	// { id: 19, name: '+49 (Germany)' },
	// { id: 20, name: '+51 (Peru)' },
	// { id: 21, name: '+52 (Mexico)' },
	// { id: 22, name: '+53 (Cuba)' },
	// { id: 23, name: '+54 (Argentina)' },
	// { id: 24, name: '+55 (Brazil)' },
	// { id: 25, name: '+56 (Chile)' },
	// { id: 26, name: '+57 (Colombia)' },
	// { id: 27, name: '+58 (Venezuela)' },
	// { id: 28, name: '+60 (Malaysia)' },
	// { id: 29, name: '+61 (Australia)' },
	// { id: 30, name: '+62 (Indonesia)' },
	// { id: 31, name: '+63 (Philippines)' },
	// { id: 32, name: '+64 (New Zealand)' },
	// { id: 33, name: '+65 (Singapore)' },
	// { id: 34, name: '+66 (Thailand)' },
	// { id: 35, name: '+81 (Japan)' },
	// { id: 36, name: '+82 (South Korea)' },
	{ id: 37, name: '+84 (Vietnam)' },
	// { id: 38, name: '+86 (China)' },
	// { id: 39, name: '+90 (Turkey)' },
	// { id: 40, name: '+91 (India)' },
	// { id: 41, name: '+92 (Pakistan)' },
	// { id: 42, name: '+93 (Afghanistan)' },
	// { id: 43, name: '+94 (Sri Lanka)' },
	// { id: 44, name: '+95 (Myanmar)' },
	// { id: 45, name: '+98 (Iran)' },
]

export const GENDER_LABEL = [
	{
		id: Gender.Male,
		value: 'Nam',
	},
	{
		id: Gender.Female,
		value: 'Nữ',
	},
]
