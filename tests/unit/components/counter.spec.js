import { shallowMount, mount } from '@vue/test-utils'
import Counter from '@/components/Counter'

describe('Counter Component', () => {

  let wrapper 

  beforeEach( () => {
    wrapper = shallowMount( Counter )
  })

  // test('should match snapshot', () => {

  //   const wrapper = shallowMount( Counter )

  //   expect( wrapper.html() ).toMatchSnapshot()
  // })

  
  test('h2 should have default value "Counter"', () => {

    expect( wrapper.find('h2').exists() ).toBeTruthy()

    const h2Value = wrapper.find('h2').text()

    expect( h2Value ).toBe('Counter')
  })

  test('default value must be 100 in p tag', () => {

    const value = wrapper.find( '[data-testid="counter"]' ).text()

    expect( value ).toBe("100")
  })

  test('should increase and decrease counter', async() => {

    const [ increaseBtn, decreaseBtn ] = wrapper.findAll('button')

    await increaseBtn.trigger('click')
    await increaseBtn.trigger('click')
    await increaseBtn.trigger('click')

    
    await decreaseBtn.trigger('click')
    await decreaseBtn.trigger('click')

    const value = wrapper.find( '[data-testid="counter"]' ).text()

    expect( value ).toBe('101')

  })

  test('should establish default value', () => {
    
    const { start } = wrapper.props()

    const value = wrapper.find( '[data-testid="counter"]' ).text()

    expect( Number(value) ).toBe( start )

  })

  test('should show prop title', () => {

    const title = "Hello World!!!!!"

    const wrapper = shallowMount( Counter, {
      props: {
        title
      }
    })

   expect( wrapper.find( 'h2' ).text() ).toBe( title )

  })


})