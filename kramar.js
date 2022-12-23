// It suitable only for 3 x 4 matrix;

//TODO: Make it suitable for any matrix
const ROWS_NUMBER = 3;

const getDiagonalAndTriangles = matrix => {
  const diagonal = matrix[0][0] * matrix[1][1] * matrix[2][2];
  const triangleA = matrix[0][1] * matrix[1][2] * matrix[2][0]
  const triangleB = matrix[0][2] * matrix[1][0] * matrix[2][1]

  console.log(`(${matrix[0][0]} * ${matrix[1][1]} * ${matrix[2][2]}) + (${matrix[0][1]} * ${matrix[1][2]} * ${matrix[2][0]}) + (${matrix[0][2]} * ${matrix[1][0]} * ${matrix[2][1]})`)
  
  return diagonal + triangleA + triangleB
}

const getDeterminant = matrix => {
  console.group('Calculating determinant for matrix: ');
  console.table(matrix)

  const main = getDiagonalAndTriangles(matrix);
  console.log('-')

  const reverse = getDiagonalAndTriangles(replaceRow(matrix, 0, 2))
  const determinant = main-reverse;

  console.log("=", determinant)
  console.groupEnd()

  return determinant
}

const replaceRow = (matrix, indexToReplace, newIndex = 3) => {
  const newMatrix = [
    [...matrix[0]],
    [...matrix[1]],
    [...matrix[2]],
  ]
  for(let i=0; i< matrix.length; i++){
    newMatrix[i][indexToReplace] = matrix[i][newIndex];
    newMatrix[i][newIndex] = matrix[i][indexToReplace];
  }
  return newMatrix
}

export const kramarMethod = matrix => {

  if(!matrix.length === ROWS_NUMBER){
    console.error('Provide 3 x 3 matrix, other not fits')
    return;
  }

  if(!matrix.every(row => row.length === ROWS_NUMBER + 1)){
    console.error('Each row should contain 4 elements, 3 for unknown and 1 for result')
    return;
  }

  const maxtrixList = {
    main: matrix,
    x1:replaceRow(matrix, 0) ,
    x2:replaceRow(matrix, 1) ,
    x3:replaceRow(matrix, 2) 
  }

  const determinants = {}

  for(const key in maxtrixList){
    const determinant = getDeterminant(maxtrixList[key])
    if(determinant === 0 && key === 'main'){
      throw new Error('Provided matrix is not fitting for Kramar method due to determinant equal 0')
    } else {
      determinants[key] = determinant;
    }
  }
  const X1 = determinants.x1 / determinants.main
  const X2 = determinants.x2 / determinants.main
  const X3 = determinants.x3 / determinants.main

  console.group('Result')
  console.log(`X1 = ${determinants.x1} / ${determinants.main} = ${X1} `)
  console.log(`X2 = ${determinants.x2} / ${determinants.main} = ${X2}`)
  console.log(`X3 = ${determinants.x3} / ${determinants.main} = ${X3}`)
  console.groupEnd()

  return { X1, X2, X3} 
}


const matrix = [
  [3,1,-7,28],
  [4,5,-2,19],
  [1,9,5, -14]
];

kramarMethod(matrix)
