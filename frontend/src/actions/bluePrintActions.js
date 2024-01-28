import axios from 'axios'

export const listBluePrints = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token.queryKey[1]}`,
    },
  }

  const { data } = await axios.get(`/api/blueprint`, config)

  return data
}


export const createBlueprint = async (product) => {
  console.log(product)

  const config = {
    headers: {
      Authorization: `Bearer ${product.token}`,
    },
  }

  localStorage.setItem('bluePrintBucket', JSON.stringify({}))

  return await axios.post(`/api/blueprint`, product.bluePrintObject
  , config)
}

