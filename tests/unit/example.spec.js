

describe ('Example Component', () => {
  test ( 'Debe ser mayor que 10', () => {
    // Arreglar
    let value = 10

    // Estímulo
    value +=2

    // Observar el resultado
    expect( value ).toBeGreaterThan( 10 )
  })
})