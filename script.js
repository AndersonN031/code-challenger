function normalizeString(str) {
    return str
        .toLowerCase()
<<<<<<< HEAD
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') 
        .replace(/(\d+)\s*(l|kg|g|ml|quilo|litro)/i, '$1$2') 
        .replace(/\s+/g, ' ') 
=======
        .normalize('NFD') // Remove acentos
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/(\d+)\s*(l|kg|g|ml|quilo|litro)/i, '$1$2') // Junta número e unidade
        .replace(/\s+/g, ' ') // Remove espaços extras
>>>>>>> f0a8788 (reajuste após revisão)
        .trim();
}

function categorizeProducts(products) {
    const categoriesMap = new Map();

<<<<<<< HEAD
    
=======
    // Listas de referência
    const knownBrands = [
        'piracanjuba', 'italac', 'parmalat', 'tio joão', 'camil'
    ];
    const types = [
        'integral', 'desnatado', 'semi-desnatado', 'semi desnatado', 'branco', 'carioca', 'tipo carioca'
    ];
    const commonWords = [
        'leite', 'arroz', 'feijão', 'feijao', 'tipo'
    ];
>>>>>>> f0a8788 (reajuste após revisão)
    const unitSubstitutions = {
        'quilo': 'kg',
        'litro': 'l',
        'kilo': 'kg',
        'kg': 'kg',
        'l': 'l',
        'g': 'g',
        'ml': 'ml'
    };

<<<<<<< HEAD
    
    const knownBrands = [
        'piracanjuba', 'italac', 'elegê', 'parmalat', 'tirolez', 'scala', 'del valle', 'natural one', 'maguary',
        'aurora', 'casa de madeira', 'friboi', 'seara', 'swift', 'perdigão', 'sadia', 'tio joão', 'camil', 'kicaldo',
        'soya', 'liza', 'cocinero', 'adria', 'renata', 'fortaleza', 'barilla'
    ];

    
    const types = ['integral', 'desnatado', 'semi-desnatado', 'branco', 'carioca', 'mussarela', 'prato', 'espaguete', 'parafuso'];

    
    const commonWords = ['leite', 'arroz', 'feijao', 'tipo', 'suco', 'queijo', 'carne', 'file', 'picanha', 'macarrao', 'oleo', 'de', 'bovina'];

    
    const sizeRegex = /(\d+(?:\.\d+)?)\s*(l|kg|g|ml|quilo|litro)/i;
    const sizeMatch = normalizedTitle.match(sizeRegex);
    if (sizeMatch) {
        size = sizeMatch[0].replace(/\s+/g, '');
        
        Object.entries(unitSubstitutions).forEach(([key, value]) => {
            size = size.replace(key, value);
        });
    }

    
    words.forEach(word => {
        if (word.match(sizeRegex)) return;

        if (types.includes(word) && !type) {
            type = word; 
            return;
        }

        if (!brand && knownBrands.includes(word)) {
            brand = word; 
            return;
        }

        if (!commonWords.includes(word) && !types.includes(word) && !knownBrands.includes(word)) {
            coreProduct.push(word); 
        }
    });

  
    const productWords = words.filter(w =>
        commonWords.includes(w) || (type && w === type) || (size && w === size)
    );
    const finalCoreProduct = productWords.join(' ');

    return {
        brand: brand || 'default',
        type: type || 'default',
        size: size || 'default',
        coreProduct: finalCoreProduct || 'default'
    };
}

function categorizeProducts(products) {
    const categoriesMap = new Map();

=======
>>>>>>> f0a8788 (reajuste após revisão)
    products.forEach(product => {
        const normalizedTitle = normalizeString(product.title);
        const words = normalizedTitle.split(' ');

        // Extrair tamanho
        let size = '';
        const sizeRegex = /(\d+(?:\.\d+)?)(l|kg|g|ml|quilo|litro)/i;
        const sizeMatch = normalizedTitle.match(sizeRegex);
        if (sizeMatch) {
            size = sizeMatch[0];
            Object.entries(unitSubstitutions).forEach(([key, value]) => {
                size = size.replace(key, value);
            });
        }

        // Separar palavras em marca, tipo e produto base
        let brand = '';
        let type = '';
        const coreProductWords = [];

        words.forEach(word => {
            if (word.match(sizeRegex)) return; // Ignora tamanho
            if (knownBrands.includes(word) && !brand) {
                brand = word;
                return;
            }
            if (types.includes(word) && !type) {
                type = word;
                return;
            }
            if (!coreProductWords.includes(word)) {
                coreProductWords.push(word);
            }
        });

        // Montar chave de categoria (ordem fixa: produto + tipo + marca + tamanho)
        const productBase = coreProductWords.filter(w => commonWords.includes(w)).join(' ');
        const categoryKey = `${productBase} ${type} ${brand} ${size}`.trim().replace(/\s+/g, ' ');

        // Capitalizar primeira letra de cada palavra para o nome da categoria
        const categoryName = categoryKey
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        if (!categoriesMap.has(categoryKey)) {
            categoriesMap.set(categoryKey, {
                category: categoryName,
                count: 0,
                products: []
            });
        }

        const category = categoriesMap.get(categoryKey);
        category.count++;
        category.products.push({
            title: product.title,
            supermarket: product.supermarket
        });
    });

    return Array.from(categoriesMap.values());
}

<<<<<<< HEAD

=======
// Teste com os dados do enunciado
>>>>>>> f0a8788 (reajuste após revisão)
const products = [
    { "id": 1, "title": "Leite Integral Piracanjuba 1L", "supermarket": "Supermercado A" },
    { "id": 2, "title": "Leite Piracanjuba Integral 1L", "supermarket": "Supermercado B" },
    { "id": 3, "title": "Leite Integral Italac 1L", "supermarket": "Supermercado A" },
    { "id": 4, "title": "Leite Italac Integral 1L", "supermarket": "Supermercado C" },
    { "id": 5, "title": "Leite Parmalat Integral 1L", "supermarket": "Supermercado D" },
    { "id": 6, "title": "Leite Desnatado Piracanjuba 1L", "supermarket": "Supermercado A" },
    { "id": 7, "title": "Piracanjuba Leite Desnatado 1L", "supermarket": "Supermercado B" },
    { "id": 8, "title": "Leite Semi-Desnatado Piracanjuba 1L", "supermarket": "Supermercado A" },
    { "id": 9, "title": "Leite Piracanjuba Semi Desnatado 1 Litro", "supermarket": "Supermercado C" },
    { "id": 10, "title": "Arroz Branco Tio João 5kg", "supermarket": "Supermercado A" },
    { "id": 11, "title": "Arroz Tio João Branco 5kg", "supermarket": "Supermercado B" },
    { "id": 12, "title": "Arroz Tio João Integral 5kg", "supermarket": "Supermercado A" },
    { "id": 13, "title": "Feijão Carioca Camil 1kg", "supermarket": "Supermercado A" },
    { "id": 14, "title": "Feijão Camil Tipo Carioca 1kg", "supermarket": "Supermercado C" },
    { "id": 15, "title": "Feijao Carioca Camil 1 Quilo", "supermarket": "Supermercado D" }
];

const categorizedProducts = categorizeProducts(products);
console.log(JSON.stringify(categorizedProducts, null, 2));
