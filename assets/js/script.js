// Variáveis
const pdfViewer = document.getElementById('pdf-viewer');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');
let currentPage = 1;
let pdfDoc = null;

// Função para carregar o PDF
function loadPDF() {
    // Caminho para o seu arquivo PDF
    const pdfPath = 'assets/img/portfolio/leonardo/catalogo.pdf';

    // Carregar o PDF usando PDF.js
    pdfjsLib.getDocument(pdfPath).promise.then(function (doc) {
        pdfDoc = doc;
        renderPage(currentPage);
    });
}

// Função para renderizar a página atual
function renderPage(pageNumber) {
    pdfDoc.getPage(pageNumber).then(function (page) {
        const viewport = page.getViewport({ scale: 1 });

        // Ajustar o tamanho do visualizador de PDF
        pdfViewer.width = viewport.width;
        pdfViewer.height = viewport.height;

        const canvas = pdfViewer;
        const context = canvas.getContext('2d');
        const renderContext = {
            canvasContext: context,
            viewport: viewport,
        };

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        page.render(renderContext);
    });
}

// Evento para a página anterior
prevPageButton.addEventListener('click', function () {
    if (currentPage > 1) {
        currentPage--;
        renderPage(currentPage);
    }
});

// Evento para a próxima página
nextPageButton.addEventListener('click', function () {
    if (currentPage < pdfDoc.numPages) {
        currentPage++;
        renderPage(currentPage);
    }
});

// Inicialização
loadPDF();
