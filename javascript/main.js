document.addEventListener('DOMContentLoaded', () => {
    
    // --- Lógica de Pestañas (Tabs) de la Práctica JS ---
    const tabButtons = document.querySelectorAll('.practica-js-container .tab-btn');
    const tabContents = document.querySelectorAll('.practica-js-container .ejercicio-tab');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Obtener el 'data-tab' del botón clickeado
            const targetTab = button.getAttribute('data-tab');

            // Ocultar todos los contenidos
            tabContents.forEach(tab => {
                tab.classList.remove('show');
            });

            // Quitar 'active' de todos los botones
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });

            // Mostrar el contenido del tab seleccionado
            const targetContent = document.getElementById(targetTab);
            if(targetContent) {
                targetContent.classList.add('show');
            }
            // Marcar el botón como activo
            button.classList.add('active');
        });
    });

    // --- Lógica AJAX (Criterio 5: URL por defecto) ---
    const urlInput = document.getElementById('url-input');
    if (urlInput) {
        urlInput.value = window.location.href;
    }

    // --- FASE 1: Lógica de los ejercicios de JavaScript ---

    // Criterio 1: Palíndromo
    const palindromoInput = document.getElementById('palindromo-input');
    const palindromoBtn = document.getElementById('palindromo-btn');
    const palindromoResultado = document.getElementById('palindromo-resultado');

    palindromoBtn.addEventListener('click', () => {
        const texto = palindromoInput.value;
        if (!texto) {
            palindromoResultado.textContent = 'Por favor, ingresa una palabra o frase.';
            return;
        }
        const textoLimpio = texto.toLowerCase().replace(/[^a-z0-9]/gi, '');
        const textoInvertido = textoLimpio.split('').reverse().join('');
        if (textoLimpio === textoInvertido) {
            palindromoResultado.textContent = `"${texto}" ¡Es un palíndromo!`;
        } else {
            palindromoResultado.textContent = `"${texto}" No es un palíndromo.`;
        }
    });

    // Criterio 2: Mayor de Dos Números
    const mayorNum1 = document.getElementById('mayor-num1');
    const mayorNum2 = document.getElementById('mayor-num2');
    const mayorBtn = document.getElementById('mayor-btn');
    const mayorResultado = document.getElementById('mayor-resultado');

    mayorBtn.addEventListener('click', () => {
        const num1 = parseFloat(mayorNum1.value);
        const num2 = parseFloat(mayorNum2.value);

        if (isNaN(num1) || isNaN(num2)) {
            mayorResultado.textContent = 'Por favor, ingresa dos números válidos.';
            return;
        }

        if (num1 > num2) {
            mayorResultado.textContent = `El número mayor es: ${num1}`;
        } else if (num2 > num1) {
            mayorResultado.textContent = `El número mayor es: ${num2}`;
        } else {
            mayorResultado.textContent = 'Ambos números son iguales.';
        }
    });

    // Criterio 3: Extraer Vocales
    const extraerInput = document.getElementById('extraer-input');
    const extraerBtn = document.getElementById('extraer-btn');
    const extraerResultado = document.getElementById('extraer-resultado');

    extraerBtn.addEventListener('click', () => {
        const frase = extraerInput.value;
        if (!frase) {
            extraerResultado.textContent = 'Por favor, ingresa una frase.';
            return;
        }
        
        const vocalesEncontradas = frase.match(/[aeiouáéíóú]/gi);

        if (vocalesEncontradas) {
            extraerResultado.textContent = `Vocales encontradas: ${vocalesEncontradas.join(', ')}`;
        } else {
            extraerResultado.textContent = 'No se encontraron vocales en la frase.';
        }
    });

    // Criterio 4: Contar Vocales
    const contarInput = document.getElementById('contar-input');
    const contarBtn = document.getElementById('contar-btn');
    const contarResultado = document.getElementById('contar-resultado');

    contarBtn.addEventListener('click', () => {
        const frase = contarInput.value;
        if (!frase) {
            contarResultado.textContent = 'Por favor, ingresa una frase.';
            return;
        }

        const fraseLimpia = frase.toLowerCase();
        const contadorVocales = { 'a': 0, 'e': 0, 'i': 0, 'o': 0, 'u': 0 };
        let totalVocales = 0;

        for (const caracter of fraseLimpia) {
            switch (caracter) {
                case 'a': case 'á':
                    contadorVocales['a']++;
                    totalVocales++;
                    break;
                case 'e': case 'é':
                    contadorVocales['e']++;
                    totalVocales++;
                    break;
                case 'i': case 'í':
                    contadorVocales['i']++;
                    totalVocales++;
                    break;
                case 'o': case 'ó':
                    contadorVocales['o']++;
                    totalVocales++;
                    break;
                case 'u': case 'ú':
                    contadorVocales['u']++;
                    totalVocales++;
                    break;
            }
        }
        
        if (totalVocales > 0) {
            const resultadoString = Object.entries(contadorVocales)
                                      .map(([vocal, conteo]) => `${vocal}: ${conteo}`)
                                      .join(' | ');
            contarResultado.textContent = `Conteo: ${resultadoString}`;
        } else {
            contarResultado.textContent = 'No se encontraron vocales en la frase.';
        }
    });


    // --- FASE 2: Lógica del botón AJAX (Criterios 6, 7, 8, 9) ---
    
    const ajaxBtn = document.getElementById('btn-mostrar-contenidos');
    const ajaxEstados = document.getElementById('ajax-estados');
    const ajaxCodigo = document.getElementById('ajax-codigo');
    const ajaxCabeceras = document.getElementById('ajax-cabeceras');
    const ajaxContenido = document.getElementById('ajax-contenido');

    ajaxBtn.addEventListener('click', () => {
        const url = urlInput.value;
        if (!url) {
            ajaxContenido.textContent = 'Por favor, ingresa una URL.';
            return;
        }

        // Limpiar resultados anteriores
        ajaxEstados.textContent = 'Iniciando petición...';
        ajaxCodigo.textContent = '---';
        ajaxCabeceras.textContent = '---';
        ajaxContenido.textContent = 'Cargando...';

        const xhr = new XMLHttpRequest();

        // Criterio 7: Mostrar estados de la petición
        xhr.onreadystatechange = () => {
            switch (xhr.readyState) {
                case 0:
                    ajaxEstados.textContent = '0: No iniciada (UNSENT)';
                    break;
                case 1:
                    ajaxEstados.textContent = '1: Conexión establecida (OPENED)';
                    break;
                case 2:
                    ajaxEstados.textContent = '2: Petición recibida (HEADERS_RECEIVED)';
                    break;
                case 3:
                    ajaxEstados.textContent = '3: Procesando petición (LOADING)';
                    break;
                case 4:
                    ajaxEstados.textContent = '4: Petición completada (DONE)';
                    
                    // Criterio 9: Mostrar código y texto de estado
                    ajaxCodigo.textContent = `${xhr.status}: ${xhr.statusText}`;
                    
                    // Criterio 8: Mostrar cabeceras
                    const headers = xhr.getAllResponseHeaders();
                    ajaxCabeceras.textContent = headers || 'No se pudieron obtener las cabeceras.';
                    
                    // Criterio 6: Mostrar contenido
                    if (xhr.status === 200) {
                        // Petición exitosa
                        ajaxContenido.textContent = xhr.responseText;
                    } else {
                        // Error en la petición
                        ajaxContenido.textContent = `Error ${xhr.status}: No se pudo cargar el contenido.`;
                    }
                    break;
            }
        };

        // Manejador para errores de red (ej. CORS, DNS)
        xhr.onerror = () => {
            ajaxEstados.textContent = 'Error de red';
            ajaxContenido.textContent = 'Error al intentar conectar. Verifica la URL y la política CORS del servidor.';
            ajaxCodigo.textContent = 'Error';
        };

        try {
            xhr.open('GET', url, true);
            xhr.send();
        } catch (e) {
            ajaxEstados.textContent = 'Error';
            ajaxContenido.textContent = `Error al abrir la petición: ${e.message}. Asegúrate de que la URL sea válida.`;
        }
    });
});