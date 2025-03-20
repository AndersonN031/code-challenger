function normalizeString(str) {
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/(\d+)\s*(l|kg|g|ml|quilo|litro)/i, '$1$2')
        .replace(/\s+/g, ' ')
        .trim();
}

function extractKeyFeatures(title) {
    const normalizedTitle = normalizeString(title);
    const words = normalizedTitle.split(/\s+/);
    let brand = '';
    let type = '';
    let size = '';
    const coreProduct = [];

    const sizeRegex = /(\d+(?:\.\d+)?)(l|kg|g|ml|quilo|litro)/i;


    words.forEach(word => {
        const sizeMatch = word.match(sizeRegex);
        if (sizeMatch) {
            size = sizeMatch[0];
        }
    });

    
    const types = ['integral', 'desnatado', 'semi-desnatado', 'branco', 'carioca', 'mussarela', 'prato', 'espaguete', 'parafuso'];
    const commonWords = ['leite', 'arroz', 'feijao', 'tipo', 'suco', 'queijo', 'carne', 'file', 'picanha', 'macarrao', 'oleo', 'de', 'bovina'];

    // Extrair características
    words.forEach(word => {
        if (word.match(sizeRegex)) {
            return; // Pula palavras de tamanho já identificadas
        }

        if (types.includes(word) && !type) {
            type = word;
            return;
        }

        if (!brand && !commonWords.includes(word) && !types.includes(word)) {
            brand = word;
            return;
        }

        if (!commonWords.includes(word) && word !== brand && word !== type) {
            coreProduct.push(word);
        }
    });


    if (normalizedTitle.includes('semi desnatado')) {
        type = 'semi-desnatado';
    }
    if (size === '1quilo') size = '1kg';
    if (size === '1litro') size = '1l';

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

    products.forEach(product => {
        const features = extractKeyFeatures(product.title);
    
        const categoryKey = `${features.coreProduct} ${features.type} ${features.size}`.trim();

        if (!categoriesMap.has(categoryKey)) {
            categoriesMap.set(categoryKey, {
                category: `${features.coreProduct} ${features.size}`, 
                count: 0,
                products: []
            });
        }

        const category = categoriesMap.get(categoryKey);
        category.count++;
        category.products.push({
            title: product.title,
            supermarket: product.supermarket,
            price: product.price
        });
    });

    return Array.from(categoriesMap.values());
}
const products = [
    { "id": 1, "title": "Leite Integral Piracanjuba 1L", "supermarket": "Supermercado A", "price": 4.99 },
    { "id": 2, "title": "Leite Integral Italac 1L", "supermarket": "Supermercado B", "price": 5.29 },
    { "id": 3, "title": "Leite Integral Elegê 1L", "supermarket": "Supermercado C", "price": 4.89 },
    { "id": 4, "title": "Leite Integral Parmalat 1L", "supermarket": "Supermercado D", "price": 5.19 },
    { "id": 5, "title": "Leite Desnatado Piracanjuba 1L", "supermarket": "Supermercado A", "price": 4.79 },
    { "id": 6, "title": "Leite Desnatado Italac 1L", "supermarket": "Supermercado B", "price": 4.99 },
    { "id": 7, "title": "Queijo Mussarela Piracanjuba 500g", "supermarket": "Supermercado A", "price": 19.99 },
    { "id": 8, "title": "Queijo Mussarela Tirolez 500g", "supermarket": "Supermercado B", "price": 21.49 },
    { "id": 9, "title": "Queijo Mussarela Scala 500g", "supermarket": "Supermercado C", "price": 22.49 },
    { "id": 10, "title": "Queijo Prato Tirolez 500g", "supermarket": "Supermercado D", "price": 20.99 },
    { "id": 11, "title": "Queijo Prato Scala 500g", "supermarket": "Supermercado A", "price": 22.49 },
    { "id": 12, "title": "Suco de Laranja Del Valle 900ml", "supermarket": "Supermercado A", "price": 3.99 },
    { "id": 13, "title": "Suco de Laranja Natural One 900ml", "supermarket": "Supermercado B", "price": 4.49 },
    { "id": 14, "title": "Suco de Laranja Maguary 1L", "supermarket": "Supermercado C", "price": 4.79 },
    { "id": 15, "title": "Suco de Uva Integral Aurora 900ml", "supermarket": "Supermercado C", "price": 4.29 },
    { "id": 16, "title": "Suco de Uva Integral Casa de Madeira 900ml", "supermarket": "Supermercado A", "price": 5.29 },
    { "id": 17, "title": "Carne Moída Friboi 1kg", "supermarket": "Supermercado A", "price": 29.99 },
    { "id": 18, "title": "Carne Moída Seara 1kg", "supermarket": "Supermercado B", "price": 31.99 },
    { "id": 19, "title": "Carne Moída Swift 500g", "supermarket": "Supermercado C", "price": 15.99 },
    { "id": 20, "title": "Filé de Frango Seara 1kg", "supermarket": "Supermercado C", "price": 18.99 },
    { "id": 21, "title": "Filé de Frango Perdigão 1kg", "supermarket": "Supermercado A", "price": 19.99 },
    { "id": 22, "title": "Peito de Frango Sadia 1kg", "supermarket": "Supermercado B", "price": 22.49 },
    { "id": 23, "title": "Peito de Frango Swift 1kg", "supermarket": "Supermercado C", "price": 23.49 },
    { "id": 24, "title": "Picanha Bovina Friboi 1kg", "supermarket": "Supermercado A", "price": 79.99 },
    { "id": 25, "title": "Picanha Bovina Swift 1kg", "supermarket": "Supermercado B", "price": 84.99 },
    { "id": 26, "title": "Arroz Branco Tio João 5kg", "supermarket": "Supermercado C", "price": 24.99 },
    { "id": 27, "title": "Arroz Branco Camil 5kg", "supermarket": "Supermercado A", "price": 26.99 },
    { "id": 28, "title": "Feijão Carioca Kicaldo 1kg", "supermarket": "Supermercado B", "price": 7.89 },
    { "id": 29, "title": "Feijão Carioca Camil 1kg", "supermarket": "Supermercado C", "price": 8.49 },
    { "id": 30, "title": "Óleo de Soja Soya 900ml", "supermarket": "Supermercado A", "price": 8.79 },
    { "id": 31, "title": "Óleo de Soja Liza 900ml", "supermarket": "Supermercado B", "price": 9.29 },
    { "id": 32, "title": "Óleo de Soja Cocinero 1L", "supermarket": "Supermercado C", "price": 9.49 },
    { "id": 33, "title": "Macarrão Espaguete Adria 500g", "supermarket": "Supermercado C", "price": 4.99 },
    { "id": 34, "title": "Macarrão Espaguete Renata 500g", "supermarket": "Supermercado A", "price": 5.49 },
    { "id": 35, "title": "Macarrão Parafuso Fortaleza 500g", "supermarket": "Supermercado B", "price": 4.99 },
    { "id": 36, "title": "Macarrão Parafuso Barilla 500g", "supermarket": "Supermercado C", "price": 5.49 }
]

const categorizedProducts = categorizeProducts(products);
console.log(JSON.stringify(categorizedProducts, null, 2));