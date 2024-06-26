function generarNumerosAleatorios(cantidad, maximo) {
    let numerosAleatorios = [];
    for (let i = 0; i < cantidad; i++) {
        let numeroAleatorio = Math.floor(Math.random() * (maximo + 1));
        numerosAleatorios.push(numeroAleatorio);
    }
    return numerosAleatorios;
}

let numerosAleatorios = generarNumerosAleatorios(10000, 10000);

// Función para medir el tiempo de ejecución de los algoritmos de Ordenamiento
function medirTiempoOrdenamiento(func, array) {
    let inicio = performance.now();
    func(array);
    let fin = performance.now();
    return fin - inicio;
}

// Bubble Sort
function bubbleSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
}


// Selection Sort
function selectionSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        let minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
}

// Insertion Sort
function insertionSort(arr) {
    let len = arr.length;
    for (let i = 1; i < len; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

// Algoritmo Merge Sort
function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    let middle = Math.floor(arr.length / 2);
    let left = mergeSort(arr.slice(0, middle));
    let right = mergeSort(arr.slice(middle));
    return merge(left, right);
}

function merge(left, right) {
    let result = [];
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    return result.concat(left, right);
}

// Algoritmo Quick Sort
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    let pivot = arr[Math.floor(arr.length / 2)];
    let left = arr.filter(x => x < pivot);
    let right = arr.filter(x => x > pivot);
    return quickSort(left).concat(pivot, quickSort(right));
}

// Trabajando sobre los mismos datos - Clonación
let arrayClonado;
let tiempos = {};

arrayClonado = numerosAleatorios.slice();
tiempos["Bubble Sort"] = medirTiempoOrdenamiento(bubbleSort, arrayClonado.slice());

arrayClonado = numerosAleatorios.slice();
tiempos["Selection Sort"] = medirTiempoOrdenamiento(selectionSort, arrayClonado.slice());

arrayClonado = numerosAleatorios.slice();
tiempos["Insertion Sort"] = medirTiempoOrdenamiento(insertionSort, arrayClonado.slice());

arrayClonado = numerosAleatorios.slice();
tiempos["Merge Sort"] = medirTiempoOrdenamiento(arr => mergeSort(arr), arrayClonado.slice());

arrayClonado = numerosAleatorios.slice();
tiempos["Quick Sort"] = medirTiempoOrdenamiento(arr => quickSort(arr), arrayClonado.slice());

console.log(tiempos);

// Comparación entre los tiempos obtenidos
let algoritmoMasRapido = Object.keys(tiempos).reduce((a, b) => tiempos[a] < tiempos[b] ? a : b);
let algoritmoMasLento = Object.keys(tiempos).reduce((a, b) => tiempos[a] > tiempos[b] ? a : b);

console.log("Algoritmo más rápido:", algoritmoMasRapido, "-", tiempos[algoritmoMasRapido], "ms");
console.log("Algoritmo más lento:", algoritmoMasLento, "-", tiempos[algoritmoMasLento], "ms");
