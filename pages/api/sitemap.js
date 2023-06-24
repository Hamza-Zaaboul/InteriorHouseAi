import { SitemapStream, streamToPromise } from 'sitemap';
import { createGzip } from 'zlib';

export default async function generateSitemap(req, res) {
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Content-Encoding', 'gzip');

    const smStream = new SitemapStream({
        hostname: 'https://www.studioia-interieur.fr', // Remplacez par l'URL de votre site
        gzip: true,
    });

    const pipeline = smStream.pipe(createGzip());

    // Ajoutez les URL de votre sitemap
    smStream.write({ url: '/', changefreq: 'daily', priority: 0.9 });
    smStream.write({ url: '/pricing', changefreq: 'weekly', priority: 0.3 });
    smStream.write({ url: '/dashboard', changefreq: 'monthly', priority: 0.1 });
    smStream.write({ url: '/dashboard/historique', changefreq: 'monthly', priority: 0.1 });
    smStream.write({ url: '/auth/login', changefreq: 'monthly', priority: 0.2 });
    smStream.write({ url: '/auth/resetmotdepasse', changefreq: 'monthly', priority: 0.1 });
    smStream.write({ url: '/auth/sigin', changefreq: 'monthly', priority: 0.1 });


    smStream.end();

    streamToPromise(pipeline).then((sm) => sm.toString()).then((result) => {
        res.write(result);
        res.end();
    });
}
