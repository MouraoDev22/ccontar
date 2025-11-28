document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos do DOM
    const inputText = document.getElementById('inputText');
    const wordCountEl = document.getElementById('wordCount');
    const charCountEl = document.getElementById('charCount');
    const charNoSpaceCountEl = document.getElementById('charNoSpaceCount');

    const copyBtn = document.getElementById('copyBtn');
    const clearBtn = document.getElementById('clearBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const toggleBtn = document.getElementById('toggleBtn');

    // Função principal para atualizar as contagens
    function updateCounts() {
        const text = inputText.value;

        // 1. Contagem de Palavras
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        const wordCount = text.trim() === '' ? 0 : words.length;
        wordCountEl.textContent = wordCount;

        // 2. Contagem de Caracteres (com espaços)
        const charCount = text.length;
        charCountEl.textContent = charCount;

        // 3. Contagem de Caracteres (sem espaços)
        const charNoSpaceCount = text.replace(/\s/g, '').length;
        charNoSpaceCountEl.textContent = charNoSpaceCount;
    }

    // Adiciona o listener para o evento 'input' no textarea
    inputText.addEventListener('input', updateCounts);
    // Garante a atualização ao colar, esperando o texto ser inserido no DOM
    inputText.addEventListener('paste', () => {
        setTimeout(updateCounts, 0);
    });

    // Funcionalidade do botão Limpar
    clearBtn.addEventListener('click', () => {
        inputText.value = '';
        updateCounts(); // Reseta os contadores
    });

    // Funcionalidade do botão Copiar
    copyBtn.addEventListener('click', () => {
        if (inputText.value) {
            navigator.clipboard.writeText(inputText.value)
                .then(() => {
                    // Feedback visual para o usuário
                    const originalText = copyBtn.textContent;
                    copyBtn.textContent = 'Copiado!';
                    setTimeout(() => {
                        copyBtn.textContent = originalText;
                    }, 2000);
                })
                .catch(err => {
                    console.error('Falha ao copiar texto: ', err);
                });
        }
    });

    // Funcionalidade do botão Baixar
    downloadBtn.addEventListener('click', () => {
        if (inputText.value) {
            const blob = new Blob([inputText.value], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'texto.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    });

    // --- Funcionalidade de Troca de Tema ---

    // Função que troca o tema
    function trocarTema() {
        document.body.classList.toggle('light-theme');

        // Salva a preferência do usuário no localStorage
        if (document.body.classList.contains('light-theme')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    }

    // Verifica se há um tema salvo no localStorage ao carregar a página
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
    }

    // Adiciona o evento de clique ao botão de tema
    toggleBtn.addEventListener('click', trocarTema);
});