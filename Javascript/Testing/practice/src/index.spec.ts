import { parseValue } from './index'
import { Shared } from './util' 
jest.mock('./util')


describe('Function parseValue', () => {
    const INSTANCES = {
        VIVN: 'vi-VN', 
        HKIBP: 'hk-HK-IBP', 
        HKIFWDECOM: 'hk-HK-IFWD-ECOM',
    }

    let Mock_getCountryAppInstanceCode;
    let Mock_appInstanceIsHKIFWD;

    beforeEach(() => {
        Mock_getCountryAppInstanceCode = jest.spyOn(Shared, 'getCountryAppInstanceCode');
        Mock_appInstanceIsHKIFWD = jest.spyOn(Shared, 'appInstanceIsHKIFWD');
    })

    afterEach(() => {
        Mock_getCountryAppInstanceCode.mockRestore()
        Mock_appInstanceIsHKIFWD.mockRestore()
        jest.clearAllMocks();
        jest.clearAllTimers();
        
    })

    test('[0] - Should return the same input when is not a string', () => {
        const value = 1234
        
        Mock_getCountryAppInstanceCode.mockReturnValue('hk-HK-IFWD-ECOM')
        Mock_appInstanceIsHKIFWD.mockReturnValue(true)
        const result = parseValue(value)
        
        expect(result).toBe(value)
        expect(typeof result).toBe(typeof value)
        
    })
    test('[1] - on HK$145.12 should receive a number 145.12', () => {
        const value = "HK$145.12"
        
        Mock_getCountryAppInstanceCode.mockReturnValue('hk-HK-IFWD-ECOM')
        Mock_appInstanceIsHKIFWD.mockReturnValue(true)
        const result = parseValue(value)

        expect(result).toBe(145.12)
        expect(typeof result).not.toBe(typeof value)
    })
    test('[2] - on HK$1,801.53 should receive a number 1801.53', () => {
        const value = "HK$1,801.53"

        Mock_getCountryAppInstanceCode.mockReturnValue('hk-HK-IFWD-ECOM')
        Mock_appInstanceIsHKIFWD.mockReturnValue(true)
        const result = parseValue(value)
        
        expect(result).toBe(1801.53)
        expect(typeof result).not.toBe(typeof value)
    })
    test('[3] - on HK$1.801,53 should receive a number 1801.53', () => {
        const value = "HK$1.801,53"

        Mock_getCountryAppInstanceCode.mockReturnValue('hk-HK-IFWD-ECOM')
        Mock_appInstanceIsHKIFWD.mockReturnValue(true)
        const result = parseValue(value)
        
        expect(result).toBe(1801.53)
        expect(typeof result).not.toBe(typeof value)
    })
    test('[4] - on HK$1.801,50 should receive a number 1801.50', () => {
        const value = "HK$1.801,50"

        Mock_getCountryAppInstanceCode.mockReturnValue('hk-HK-IFWD-ECOM')
        Mock_appInstanceIsHKIFWD.mockReturnValue(true)
        const result = parseValue(value)
        
        expect(result).toBe(1801.50)
        expect(typeof result).not.toBe(typeof value)
    })
    test('[5] - on HK$1.801,50 should receive a number 1801.50', () => {
        const value = "HK$1.801,50"

        Mock_getCountryAppInstanceCode.mockReturnValue('hk-HK-IFWD-ECOM')
        Mock_appInstanceIsHKIFWD.mockReturnValue(true)
        const result = parseValue(value)
        
        expect(result).toBe(1801.50)
        expect(typeof result).not.toBe(typeof value)
    })
    test('[6] - on HK$123.180.100,50 should receive a number 1801.50', () => {
        const value = "HK$123.180.100,50"

        Mock_getCountryAppInstanceCode.mockReturnValue('hk-HK-IFWD-ECOM')
        Mock_appInstanceIsHKIFWD.mockReturnValue(true)
        const result = parseValue(value)
        
        expect(result).toBe(123180100.50)
        expect(typeof result).not.toBe(typeof String)
    })
    test('[7] - on ₫100,508 should receive a number 100.50', () => {
        const value = "₫100,508"

        Mock_getCountryAppInstanceCode.mockReturnValue('vi-VN')
        Mock_appInstanceIsHKIFWD.mockReturnValue(false)
        const result = parseValue(value)
        
        expect(result).toBe(100.51)
        expect(typeof result).not.toBe(typeof value)
    })
    test('[8] - on  should receive a number 100.50', () => {
        const value = "100,508"

        Mock_getCountryAppInstanceCode.mockReturnValue('vi-VN')
        Mock_appInstanceIsHKIFWD.mockReturnValue(false)
        const result = parseValue(value)
        
        expect(result).toBe(100.51)
        expect(typeof result).not.toBe(typeof value)
    })
})
