document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const lista = document.querySelector('.apresentacao__questoes__lista');
            if (data.virologia) {
                data.virologia.forEach((q, index) => {
                    const li = document.createElement('li');
                    li.classList.add('apresentacao__questoes__lista__item');
                                
                    // Cria container de alternativas interativas
                    const alternativasHTML = q.alternativas.map((alt, i) => {
                        return `<button class="alternativa-btn" onclick="verificarResposta(this, '${q.gabarito}', '${i}')">${alt}</button>`;
                    }).join('');

                    li.innerHTML = `
                        <h3 class="apresentacao__questoes__lista__item__titulo">${q.titulo}</h3>
                        <h4 class="apresentacao__questoes__lista__item__enunciado">${q.enunciado}</h4>
                        <div class="apresentacao__questoes__lista__item__alternativas" id="q${index}">
                            ${alternativasHTML}
                        </div>
                        <div class="feedback-container" style="display: none;">
                            <p><strong>Explicação:</strong> ${q.explicacao}</p>
                        </div>
                    `;
                    lista.appendChild(li);
                });
            }
        })
    .catch(error => console.error('Erro ao carregar questões:', error));
});

function verificarResposta(btn, gabaritoCompleto, index) {
    const container = btn.parentElement;
    const feedback = container.nextElementSibling;
    const botoes = container.querySelectorAll('.alternativa-btn');
                
    // Extrai a letra correta do gabarito (ex: "c) ... " -> "c")
    const letraGabarito = gabaritoCompleto.split(')')[0].trim().toLowerCase();
                
    // Mapeia índice para letra (0->a, 1->b, etc)
    const letras = ['a', 'b', 'c', 'd', 'e'];
    const letraEscolhida = letras[index];

    // Desabilita todos os botões após a escolha
    botoes.forEach(b => b.disabled = true);

    if (letraEscolhida === letraGabarito) {
        btn.classList.add('correta');
    } else {
        btn.classList.add('errada');
        // Encontra e marca a correta
        const indexCorreto = letras.indexOf(letraGabarito);
        if(indexCorreto !== -1) botoes[indexCorreto].classList.add('correta');
    }

    // Mostra a explicação
    feedback.style.display = 'block';
}