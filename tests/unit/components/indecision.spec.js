import { shallowMount, mount } from "@vue/test-utils";
import Indecision from '@/components/Indecision'


describe( 'Indecision Component', () => {

  let wrapper
  let clgSpy

  beforeEach( () => {
    wrapper = shallowMount( Indecision )
    clgSpy = jest.spyOn(console, 'log')
  })

  test('should match snapshot', () => {
    expect( wrapper.html() ).toMatchSnapshot()
  })

  test('should not trigger anything when you write input, except console.log', async() => {

    const input = wrapper.find('input')
    await input.setValue('Hola Mundo')

    expect( clgSpy ).toHaveBeenCalledTimes(1)
  })

  test('should trigger the fetch when a "?" is written', () => {
    
  })

  test('getAnswer test', () => {
    
  })

  test('getAnswer test - API error', () => {
    
  })
})