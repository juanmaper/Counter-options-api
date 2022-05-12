import { shallowMount, mount } from "@vue/test-utils";
import Indecision from '@/components/Indecision'


describe( 'Indecision Component', () => {

  let wrapper
  let clgSpy

  global.fetch = jest.fn( () => Promise.resolve({
    json: () => Promise.resolve({
      answer: 'yes',
      forced: false,
      image: 'https://yesno.wtf/assets/yes/2.gif'
    })
  }) )

  beforeEach( () => {
    wrapper = shallowMount( Indecision )
    clgSpy = jest.spyOn(console, 'log')

    jest.clearAllMocks()
  })

  test('should match snapshot', () => {
    expect( wrapper.html() ).toMatchSnapshot()
  })

  test('should not trigger anything when you write input, except console.log', async() => {

    const getAnswerSpy = jest.spyOn( wrapper.vm, 'getAnswer' )

    const input = wrapper.find( 'input' )
    await input.setValue( 'Hola Mundo' )

    expect( clgSpy ).toHaveBeenCalledTimes(1)
    expect( getAnswerSpy ).not.toHaveBeenCalled()
  })

  test('should trigger the getAnswer when a "?" is written', async() => {
    
    const getAnswerSpy = jest.spyOn( wrapper.vm, 'getAnswer' )

    const input = wrapper.find( 'input' )
    await input.setValue( 'Hola Mundo?' )

    expect( clgSpy ).toHaveBeenCalledTimes(1)
    expect( getAnswerSpy ).toHaveBeenCalled()
  })

  test('getAnswer test', async() => {
    
    await wrapper.vm.getAnswer()

    const img = wrapper.find( 'img' )

    expect( img.exists() ).toBeTruthy()
    expect( wrapper.vm.img ).toBe( 'https://yesno.wtf/assets/yes/2.gif' )
    expect( wrapper.vm.answer ).toBe( 'Sí' )
  })

  test('getAnswer test - API error', async() => {
    
    fetch.mockImplementationOnce( () => Promise.reject('API is down') )

    await wrapper.vm.getAnswer()

    const img = wrapper.find( 'img' )

    expect( img.exists() ).toBeFalsy()
    expect( wrapper.vm.answer ).toBe( 'No se pudo cargar del API' )
  })
})