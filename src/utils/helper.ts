import { Alert, NativeScrollEvent } from 'react-native'
import { scale } from './scale'

import {
	CAN,
	CAN_CHI,
	CAN_GROUP_DECLARE,
	CHI,
	CUNG_GROUP_DECLARE,
	GIO_HD,
	HOURS_CAN,
	HOURS_CAN_START,
	ICON_CHI,
	PHUONG_VI_CAT_HUNG_BGCOLOR,
	TIETKHI,
	TK19,
	TK20,
	TK21,
	TK22,
	XEMNGAY,
} from './constant'
import { forEach } from 'lodash'
import { Image } from 'react-native-image-crop-picker'

export function getTextDay(
	goodThing: string,
	uglyThing: string,
	goodStar: string,
	uglyStar: string,
	dateConfig: any,
) {
	if (!goodThing.trim() || !goodStar.trim()) {
		return {
			is_good: false,
			text: 'Ngày rất xấu',
		}
	}
	if (!uglyThing.trim() || !uglyStar.trim()) {
		return {
			is_good: true,
			text: 'Ngày rất tốt',
		}
	}

	const percent: number =
		(goodThing.split(',').length / uglyThing.split(',').length) * dateConfig.factor_2 +
		(goodStar.split(',').length / uglyStar.split(',').length) * dateConfig.factor_1
	if (percent >= dateConfig.very_good_from) {
		return {
			is_good: true,
			text: 'Ngày rất tốt',
		}
	}
	if (percent >= dateConfig.good_from && percent <= dateConfig.very_good_from) {
		return {
			is_good: true,
			text: 'Ngày tốt',
		}
	}
	if (percent < dateConfig.good_from && percent >= dateConfig.ugly_from) {
		return {
			is_good: false,
			text: 'Ngày xấu',
		}
	}
	return {
		is_good: false,
		text: 'Ngày rất xấu',
	}
}

export function getTextHour(
	hour: number,
	text: string,
	dataHourInDays: any,
	quyNhan: any,
	tuDai: any,
	canNgay: string,
	hoursConfig: any,
) {
	const isQuyNhan = quyNhan.some((el: any) => el.hour.trim() === text)
	const isTuDai = tuDai.some((el: any) => el.hour.trim() === text && el.can_ngay.trim() === canNgay)
	let countGood: number = 0
	let countUgly: number = 0
	;(dataHourInDays[`hour_${hour}`] || []).forEach((el: any) => {
		if (el.good_ugly_stars === 1) {
			countGood += 1
		} else if (el.good_ugly_stars === 2) {
			countUgly += 1
		}
	})

	if (isQuyNhan || isTuDai) {
		countGood += 1
	}

	const percent: number = countGood / (countUgly || 0.1)
	if ((isQuyNhan || isTuDai) && percent >= hoursConfig.very_good) {
		return {
			is_good: true,
			text: 'Giờ rất tốt',
			percent: 100,
		}
	}

	if (countGood / (countUgly || 0.1) >= hoursConfig.good) {
		return {
			is_good: true,
			text: 'Giờ tốt',
			percent,
		}
	}

	if (countUgly / (countGood || 0.1) >= hoursConfig.ugly) {
		return {
			is_good: false,
			text: 'Giờ xấu',
			percent,
		}
	}

	return {
		is_good: false,
		text: '',
		percent: 0,
	}
}

export function removeZero(value: string) {
	return +value
}

export function addZero(value: string | number) {
	return value.toString().length === 1 ? `0${value}` : value
}

// eslint-disable-next-line func-names
const LunarDate = function (this: any, dd: any, mm: any, yy: any, leap: any, jd: any) {
	this.day = dd
	this.month = mm
	this.year = yy
	this.leap = leap
	this.jd = jd
}

/*
 * Copyright (c) 2006 Ho Ngoc Duc. All Rights Reserved.
 * Astronomical algorithms from the book "Astronomical Algorithms" by Jean Meeus, 1998
 *
 * Permission to use, copy, modify, and redistribute this software and its
 * documentation for personal, non-commercial use is hereby granted provided that
 * this copyright notice and appropriate documentation appears in all copies.
 */
const { PI } = Math

/* Discard the fractional part of a number, e.g., INT(3.2) = 3 */
function INT(d: any) {
	return Math.floor(d)
}

/* Compute the (integral) Julian day number of day dd/mm/yyyy, i.e., the number
 * of days between 1/1/4713 BC (Julian calendar) and dd/mm/yyyy.
 * Formula from http://www.tondering.dk/claus/calendar.html
 */
function jdFromDate(dd: any, mm: any, yy: any) {
	let jd: any
	const a = INT((14 - mm) / 12)
	const y = yy + 4800 - a
	const m = mm + 12 * a - 3
	jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - INT(y / 100) + INT(y / 400) - 32045
	if (jd < 2299161) {
		jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - 32083
	}
	return jd
}

/* Convert a Julian day number to day/month/year. Parameter jd is an integer */
function jdToDate(jd: any) {
	let a
	let b
	let c
	if (jd > 2299160) {
		// After 5/10/1582, Gregorian calendar
		a = jd + 32044
		b = INT((4 * a + 3) / 146097)
		c = a - INT((b * 146097) / 4)
	} else {
		b = 0
		c = jd + 32082
	}
	const d = INT((4 * c + 3) / 1461)
	const e = c - INT((1461 * d) / 4)
	const m = INT((5 * e + 2) / 153)
	const day = e - INT((153 * m + 2) / 5) + 1
	const month = m + 3 - 12 * INT(m / 10)
	const year = b * 100 + d - 4800 + INT(m / 10)
	return [day, month, year]
}

/* Compute the time of the k-th new moon after the new moon of 1/1/1900 13:52 UCT
 * (measured as the number of days since 1/1/4713 BC noon UCT, e.g., 2451545.125 is 1/1/2000 15:00 UTC).
 * Returns a floating number, e.g., 2415079.9758617813 for k=2 or 2414961.935157746 for k=-2
 * Algorithm from: "Astronomical Algorithms" by Jean Meeus, 1998
 */
function NewMoon(k: any) {
	let Jd1

	let C1
	let deltat

	const T = k / 1236.85 // Time in Julian centuries from 1900 January 0.5
	const T2 = T * T
	const T3 = T2 * T
	const dr = PI / 180
	Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3
	Jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr) // Mean new moon
	const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3 // Sun's mean anomaly
	const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3 // Moon's mean anomaly
	const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3 // Moon's argument of latitude
	C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M)
	C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr)
	C1 -= 0.0004 * Math.sin(dr * 3 * Mpr)
	C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr))
	C1 = C1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M))
	C1 = C1 - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr))
	C1 = C1 + 0.001 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M))
	if (T < -11) {
		deltat = 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3
	} else {
		deltat = -0.000278 + 0.000265 * T + 0.000262 * T2
	}
	const JdNew = Jd1 + C1 - deltat
	return JdNew
}

/* Compute the longitude of the sun at any time.
 * Parameter: floating number jdn, the number of days since 1/1/4713 BC noon
 * Algorithm from: "Astronomical Algorithms" by Jean Meeus, 1998
 */
function SunLongitude(value: any) {
	let DL
	let L
	const T = (value - 2451545.0) / 36525 // Time in Julian centuries from 2000-01-01 12:00:00 GMT
	const T2 = T * T
	const dr = PI / 180 // degree to radian
	const M = 357.5291 + 35999.0503 * T - 0.0001559 * T2 - 0.00000048 * T * T2 // mean anomaly, degree
	const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2 // mean longitude, degree
	DL = (1.9146 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M)
	DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.00029 * Math.sin(dr * 3 * M)
	L = L0 + DL // true longitude, degree
	L *= dr
	L -= PI * 2 * INT(L / (PI * 2)) // Normalize to (0, 2*PI)
	return L
}

/* Compute sun position at midnight of the day with the given Julian day number.
 * The time zone if the time difference between local time and UTC: 7.0 for UTC+7:00.
 * The function returns a number between 0 and 11.
 * From the day after March equinox and the 1st major term after March equinox, 0 is returned.
 * After that, return 1, 2, 3 ...
 */
export function getSunLongitude(dayNumber: any, timeZone: any) {
	return INT((SunLongitude(dayNumber - 0.5 - timeZone / 24) / PI) * 12)
}

/* Compute the day of the k-th new moon in the given time zone.
 * The time zone if the time difference between local time and UTC: 7.0 for UTC+7:00
 */
function getNewMoonDay(k: any, timeZone: any) {
	return INT(NewMoon(k) + 0.5 + timeZone / 24)
}

/* Find the day that starts the luner month 11 of the given year for the given time zone */
function getLunarMonth11(yy: any, timeZone: any) {
	let nm
	// off = jdFromDate(31, 12, yy) - 2415021.076998695;
	const off = jdFromDate(31, 12, yy) - 2415021
	const k = INT(off / 29.530588853)
	nm = getNewMoonDay(k, timeZone)
	const sunLong = getSunLongitude(nm, timeZone) // sun longitude at local midnight
	if (sunLong >= 9) {
		nm = getNewMoonDay(k - 1, timeZone)
	}
	return nm
}

/* Find the index of the leap month after the month starting on the day a11. */
function getLeapMonthOffset(a11: any, timeZone: any) {
	let last
	let arc
	let i
	const k = INT((a11 - 2415021.076998695) / 29.530588853 + 0.5)
	last = 0
	i = 1 // We start with the month following lunar month 11
	arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone)
	do {
		last = arc
		// eslint-disable-next-line no-plusplus
		i++
		arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone)
		// eslint-disable-next-line eqeqeq
	} while (arc != last && i < 14)
	return i - 1
}

/* Comvert solar date dd/mm/yyyy to the corresponding lunar date */
export function convertSolar2Lunar(
	dd: any,
	mm: any,
	yy: any,
	timeZone = -(new Date().getTimezoneOffset() / 60),
) {
	let monthStart
	let a11
	let b11

	let lunarMonth
	let lunarYear
	let lunarLeap
	const dayNumber = jdFromDate(dd, mm, yy)
	const k = INT((dayNumber - 2415021.076998695) / 29.530588853)
	monthStart = getNewMoonDay(k + 1, timeZone)
	if (monthStart > dayNumber) {
		monthStart = getNewMoonDay(k, timeZone)
	}
	// alert(dayNumber+" -> "+monthStart);
	a11 = getLunarMonth11(yy, timeZone)
	b11 = a11
	if (a11 >= monthStart) {
		lunarYear = yy
		a11 = getLunarMonth11(yy - 1, timeZone)
	} else {
		lunarYear = yy + 1
		b11 = getLunarMonth11(yy + 1, timeZone)
	}
	const lunarDay = dayNumber - monthStart + 1
	const diff = INT((monthStart - a11) / 29)
	lunarLeap = 0
	lunarMonth = diff + 11
	if (b11 - a11 > 365) {
		const leapMonthDiff = getLeapMonthOffset(a11, timeZone)
		if (diff >= leapMonthDiff) {
			lunarMonth = diff + 10
			// eslint-disable-next-line eqeqeq
			if (diff == leapMonthDiff) {
				lunarLeap = 1
			}
		}
	}
	if (lunarMonth > 12) {
		lunarMonth -= 12
	}
	if (lunarMonth >= 11 && diff < 4) {
		lunarYear -= 1
	}
	return [lunarDay, lunarMonth, lunarYear, lunarLeap]
}

/* Convert a lunar date to the corresponding solar date */
export function convertLunar2Solar(
	lunarDay: any,
	lunarMonth: any,
	lunarYear: any,
	lunarLeap: any,
	timeZone = -(new Date().getTimezoneOffset() / 60),
) {
	let a11
	let b11
	let off
	let leapOff
	let leapMonth
	if (lunarMonth < 11) {
		a11 = getLunarMonth11(lunarYear - 1, timeZone)
		b11 = getLunarMonth11(lunarYear, timeZone)
	} else {
		a11 = getLunarMonth11(lunarYear, timeZone)
		b11 = getLunarMonth11(lunarYear + 1, timeZone)
	}
	const k = INT(0.5 + (a11 - 2415021.076998695) / 29.530588853)
	off = lunarMonth - 11
	if (off < 0) {
		off += 12
	}
	if (b11 - a11 > 365) {
		leapOff = getLeapMonthOffset(a11, timeZone)
		leapMonth = leapOff - 2
		if (leapMonth < 0) {
			leapMonth += 12
		}
		// eslint-disable-next-line eqeqeq
		if (lunarLeap != 0 && lunarMonth != leapMonth) {
			return [0, 0, 0]
		}
		// eslint-disable-next-line eqeqeq
		if (lunarLeap != 0 || off >= leapOff) {
			off += 1
		}
	}
	const monthStart = getNewMoonDay(k + off, timeZone)
	return jdToDate(monthStart + lunarDay - 1)
}

function jdn(dd: any, mm: any, yy: any) {
	const a = INT((14 - mm) / 12)
	const y = yy + 4800 - a
	const m = mm + 12 * a - 3
	let jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - INT(y / 100) + INT(y / 400) - 32045
	if (jd < 2299161) {
		jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - 32083
	}
	return jd
}

function jdn2date(jd: any) {
	let A
	let alpha
	let mm
	let yyyy
	const Z = jd
	if (Z < 2299161) {
		A = Z
	} else {
		alpha = INT((Z - 1867216.25) / 36524.25)
		A = Z + 1 + alpha - INT(alpha / 4)
	}
	const B = A + 1524
	const C = INT((B - 122.1) / 365.25)
	const D = INT(365.25 * C)
	const E = INT((B - D) / 30.6001)
	const dd = INT(B - D - INT(30.6001 * E))
	if (E < 14) {
		mm = E - 1
	} else {
		mm = E - 13
	}
	if (mm < 3) {
		yyyy = C - 4715
	} else {
		yyyy = C - 4716
	}
	return [dd, mm, yyyy, jd]
}

function decodeLunarYear(yy: any, k: any) {
	let currentJD
	let j
	let mm
	const ly = []
	const monthLengths = [29, 30]
	const regularMonths = new Array(12)
	// eslint-disable-next-line no-bitwise
	const offsetOfTet = k >> 17
	// eslint-disable-next-line no-bitwise
	const leapMonth = k & 0xf
	// eslint-disable-next-line no-bitwise
	const leapMonthLength = monthLengths[(k >> 16) & 0x1]
	const solarNY = jdn(1, 1, yy)
	currentJD = solarNY + offsetOfTet
	j = k >> 4
	for (let i = 0; i < 12; i++) {
		regularMonths[12 - i - 1] = monthLengths[j & 0x1]
		j >>= 1
	}
	if (leapMonth == 0) {
		for (mm = 1; mm <= 12; mm++) {
			ly.push(new (LunarDate as any)(1, mm, yy, 0, currentJD))
			currentJD += regularMonths[mm - 1]
		}
	} else {
		for (mm = 1; mm <= leapMonth; mm++) {
			ly.push(new (LunarDate as any)(1, mm, yy, 0, currentJD))
			currentJD += regularMonths[mm - 1]
		}
		ly.push(new (LunarDate as any)(1, leapMonth, yy, 1, currentJD))
		currentJD += leapMonthLength || 0
		// eslint-disable-next-line no-plusplus
		for (mm = leapMonth + 1; mm <= 12; mm++) {
			ly.push(new (LunarDate as any)(1, mm, yy, 0, currentJD))
			currentJD += regularMonths[mm - 1]
		}
	}
	return ly
}

function getYearInfo(yyyy: any) {
	let yearCode
	if (yyyy < 1900) {
		yearCode = TK19[yyyy - 1800]
	} else if (yyyy < 2000) {
		yearCode = TK20[yyyy - 1900]
	} else if (yyyy < 2100) {
		yearCode = TK21[yyyy - 2000]
	} else {
		yearCode = TK22[yyyy - 2100]
	}
	return decodeLunarYear(yyyy, yearCode)
}

export function getSolarDate(dd: any, mm: any, yyyy: any) {
	if (yyyy < 1200 || yyyy > 2199) {
		return new (LunarDate as any)(0, 0, 0, 0, 0)
	}
	const ly = getYearInfo(yyyy)
	let lm = ly[mm - 1]
	// eslint-disable-next-line eqeqeq
	if (lm?.month != mm) {
		lm = ly[mm]
	}
	// eslint-disable-next-line no-unsafe-optional-chaining
	const ld = lm?.jd + dd - 1
	return jdn2date(ld)
}

export function getYearCanChi(year: any) {
	return `${CAN[(year + 6) % 10]} ${CHI[(year + 8) % 12]}`
}

export function getTietkhiByLunar(dd: any, mm: any, yy: any) {
	const jd = jdFromDate(dd, mm, yy)
	return TIETKHI[getSunLongitude(jd + 1, 7.0)]
}

const FIRST_DAY = jdn(25, 1, 1800) // Tet am lich 1800
const LAST_DAY = jdn(31, 12, 2199)

function findLunarDate(jd: any, ly: any) {
	if (jd > LAST_DAY || jd < FIRST_DAY || ly[0].jd > jd) {
		return new (LunarDate as any)(0, 0, 0, 0, jd)
	}
	let i = ly.length - 1
	while (jd < ly[i].jd) {
		// eslint-disable-next-line no-plusplus
		i--
	}
	const off = jd - ly[i].jd
	const ret = new (LunarDate as any)(ly[i].day + off, ly[i].month, ly[i].year, ly[i].leap, jd)
	return ret
}

export function getLunarDate(dd: any, mm: any, yyyy: any) {
	let ly
	if (yyyy < 1800 || yyyy > 2199) {
		// return new LunarDate(0, 0, 0, 0, 0);
	}
	ly = getYearInfo(yyyy)
	const jd = jdn(dd, mm, yyyy)
	if (jd < ly[0].jd) {
		ly = getYearInfo(yyyy - 1)
	}
	return findLunarDate(jd, ly)
}

export function getCanChi(lunar: any) {
	let monthName
	const dayName = `${CAN[(lunar.jd + 9) % 10]} ${CHI[(lunar.jd + 1) % 12]}`
	monthName = `${CAN[(lunar.year * 12 + lunar.month + 3) % 10]} ${CHI[(lunar.month + 1) % 12]}`
	if (lunar.leap === 1) {
		monthName += ' (nhu\u1EADn)'
	}
	const yearName = getYearCanChi(lunar.year)

	const now = new Date()
	const hours = now.getHours()
	const hoursChi = HOURS_CAN.find((el: any) => el.hours.includes(hours))?.chi
	const canStart = HOURS_CAN_START.find((el: any) =>
		el.can.includes(CAN[(lunar.jd + 9) % 10]),
	)?.start
	const arrTmp = CAN.concat(CAN)
	const indexStart = CAN.findIndex((element: string) => element === canStart)
	const indexChi = CHI.findIndex((element: string) => element === hoursChi)
	const hoursCan = arrTmp[indexChi + indexStart]
	const hoursName = `${hoursCan} ${hoursChi}`
	return [dayName, monthName, yearName, hoursName]
}

export function getDayName(lunarDate: any) {
	if (lunarDate.day === 0) {
		return ''
	}
	return getCanChi(lunarDate)
}
export function checkNgayHoangDao(jm: number, cc: (string | string[])[]) {
	var isHoangDao = false
	var isHacDao = false
	const itemCheck = XEMNGAY[jm - 1]
	forEach(itemCheck.hoangdao, function (item, k) {
		if (cc[0].includes(item)) {
			isHoangDao = true
		}
	})
	forEach(itemCheck.hacdao, function (item, k) {
		if (cc[0].includes(item)) {
			isHacDao = true
		}
	})
	return {
		isHoangDao,
		isHacDao,
	}
}
export function getGioHoangDao(jd: any) {
	const chiOfDay = (jd + 1) % 12
	const gioHD: any = GIO_HD[chiOfDay % 6] // same values for Ty' (1) and Ngo. (6), for Suu and Mui etc.
	const array = []
	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < 12; i++) {
		// eslint-disable-next-line eqeqeq
		if (gioHD.charAt(i) == '1') {
			array.push({
				name: CHI[i],
				img: ICON_CHI[i],
				time: `${addZero((i * 2 + 23) % 24)}:00 - ${addZero((i * 2 + 1) % 24)}:00`,
			})
		}
	}
	return array
}

const TIME_HD = [
	'23:00 - 01:00',
	'01:00 - 03:00',
	'03:00 - 05:00',
	'05:00 - 07:00',
	'07:00 - 09:00',
	'09:00 - 11:00',
	'11:00 - 13:00',
	'13:00 - 15:00',
	'15:00 - 17:00',
	'17:00 - 19:00',
	'19:00 - 21:00',
	'21:00 - 23:00',
]

export function getTimeInDay() {
	const array = []
	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < 12; i++) {
		// eslint-disable-next-line eqeqeq
		array.push({
			name: CHI[i],
			img: ICON_CHI[i],
			time: TIME_HD[i],
		})
	}
	return array
}

export function getMonth(mm: any, yy: any) {
	let ly1
	let ly2
	let mm1
	let yy1
	let i
	if (mm < 12) {
		mm1 = mm + 1
		yy1 = yy
	} else {
		mm1 = 1
		yy1 = yy + 1
	}
	const jd1 = jdn(1, mm, yy)
	const jd2 = jdn(1, mm1, yy1)
	ly1 = getYearInfo(yy)
	// alert('1/'+mm+'/'+yy+' = '+jd1+'; 1/'+mm1+'/'+yy1+' = '+jd2);
	const tet1 = ly1[0].jd
	const result = []
	if (tet1 <= jd1) {
		/* tet(yy) = tet1 < jd1 < jd2 <= 1.1.(yy+1) < tet(yy+1) */
		// eslint-disable-next-line no-plusplus
		for (i = jd1; i < jd2; i++) {
			result.push(findLunarDate(i, ly1))
		}
	} else if (jd1 < tet1 && jd2 < tet1) {
		/* tet(yy-1) < jd1 < jd2 < tet1 = tet(yy) */
		ly1 = getYearInfo(yy - 1)
		// eslint-disable-next-line no-plusplus
		for (i = jd1; i < jd2; i++) {
			result.push(findLunarDate(i, ly1))
		}
	} else if (jd1 < tet1 && tet1 <= jd2) {
		/* tet(yy-1) < jd1 < tet1 <= jd2 < tet(yy+1) */
		ly2 = getYearInfo(yy - 1)
		// eslint-disable-next-line no-plusplus
		for (i = jd1; i < tet1; i++) {
			result.push(findLunarDate(i, ly2))
		}
		// eslint-disable-next-line no-plusplus
		for (i = tet1; i < jd2; i++) {
			result.push(findLunarDate(i, ly1))
		}
	}
	return result
}

// eslint-disable-next-line @typescript-eslint/no-shadow
export function getCanHour0(jdn: number) {
	return CAN[((jdn - 1) * 2) % 10]
}

export const getBgColorCung = (name: string) => {
	if (CUNG_GROUP_DECLARE.kham.includes(name)) return PHUONG_VI_CAT_HUNG_BGCOLOR.black
	if (CUNG_GROUP_DECLARE.canKhon.includes(name)) return PHUONG_VI_CAT_HUNG_BGCOLOR.yellow
	if (CUNG_GROUP_DECLARE.chanTon.includes(name)) return PHUONG_VI_CAT_HUNG_BGCOLOR.green
	if (CUNG_GROUP_DECLARE.ly.includes(name)) return PHUONG_VI_CAT_HUNG_BGCOLOR.red
	return PHUONG_VI_CAT_HUNG_BGCOLOR.white
}

export const getBgColorCan = (name: string) => {
	if (CAN_GROUP_DECLARE[1].includes(name)) return PHUONG_VI_CAT_HUNG_BGCOLOR.black
	if (CAN_GROUP_DECLARE[2].includes(name)) return PHUONG_VI_CAT_HUNG_BGCOLOR.yellow
	if (CAN_GROUP_DECLARE[3].includes(name)) return PHUONG_VI_CAT_HUNG_BGCOLOR.green
	if (CAN_GROUP_DECLARE[4].includes(name)) return PHUONG_VI_CAT_HUNG_BGCOLOR.red
	return PHUONG_VI_CAT_HUNG_BGCOLOR.white
}

export const findIndexCanChi = (value: any) => {
	return CAN_CHI.findIndex((element: string) => element === value)
}

export const jsUcfirst = (string: string) => {
	const tmp = string.toLowerCase()
	return tmp.charAt(0).toUpperCase() + tmp.slice(1)
}

export const formatTime = (second: number) => {
	return new Date(second * 1000).toISOString().slice(14, 19).replace(/:/g, ':')
}

export const isCloseToBottom = ({
	layoutMeasurement,
	contentOffset,
	contentSize,
}: NativeScrollEvent) => {
	const paddingToBottom = scale(20)
	return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom
}

export function isDateInCurrentMonth(dateToCheck: Date, currentDate: Date) {
	const currentMonth = currentDate.getMonth()
	const currentYear = currentDate.getFullYear()

	const checkMonth = dateToCheck.getMonth()
	const checkYear = dateToCheck.getFullYear()

	return currentMonth === checkMonth && currentYear === checkYear
}

export const areSameDay = (date1: Date, date2: Date) => {
	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate()
	)
}

export function getWeekNumber(date: Date) {
	const currentDate = typeof date === 'object' ? date : new Date()
	const januaryFirst = new Date(currentDate.getFullYear(), 0, 1)
	const daysToNextMonday = januaryFirst.getDay() === 1 ? 0 : (7 - januaryFirst.getDay()) % 7
	const nextMonday = new Date(
		currentDate.getFullYear(),
		0,
		januaryFirst.getDate() + daysToNextMonday,
	)

	return currentDate < nextMonday
		? 52
		: currentDate > nextMonday
		? Math.floor(
				//@ts-ignore
				(currentDate - nextMonday) / (24 * 3600 * 1000) / 7,
		  )
		: 1
}

export function getTotalWeeksInYear(year: string) {
	const lastDayOfYear = new Date(Number(year), 11, 31)
	return getWeekNumber(lastDayOfYear)
}

export const validateImageFile = (image: Image, maxSize: number) => {
	if (!['image/jpeg', 'image/jpg', 'image/png'].includes(image.mime)) {
		Alert.alert('Ảnh không hợp lệ', 'Vui lòng tải ảnh có định dạng jpg, jpeg, png')
		return false
	}
	if (image.size / 1024 ** 2 > maxSize) {
		Alert.alert('Ảnh không hợp lệ', `Vui lòng tải ảnh có kích thước tối đa ${maxSize}MB`)
		return false
	}
	return true
}

export const getHoroscopeYearRange = () => {
	const date = new Date()
	const minYear = date.getFullYear() - 50
	const maxYear = date.getFullYear() + 50
	let data: any = []
	for (let i: number = minYear; i <= maxYear; i++) {
		data?.push({ id: i - 1960, name: i })
	}
	return data
}

export const convertToVND = (n: number) => {
	return new Intl.NumberFormat().format(n)
}

export const handleCallApiError = (error: any) => {
	if (typeof error?.response?.data?.error?.message === 'string') {
		Alert.alert(error?.response?.data?.error?.message)
	} else {
		Alert.alert('Có lỗi xảy ra', 'Vui lòng thử lại sau')
	}
}
