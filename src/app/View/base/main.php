<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <link rel="canonical" href="<?= $this->head['url']; ?>">
        <!-- Robots -->
        <meta name="robots" content="<?= $this->head['robots']; ?>">
        <!-- Device -->
        <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1, user-scalable=no"> -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1, maximum-scale=5.0">
        <meta name="format-detection" content="telephone=no">
        <!-- SEO -->
        <title><?= $this->head['title']; ?></title>
        <meta name="description" content="<?= $this->head['description']; ?>">
        <!-- Twitter -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:site" content="<?= $this->head['twitter']['pseudo']; ?>">
        <meta name="twitter:title" content="<?= $this->head['title']; ?>">
        <meta name="twitter:description" content="<?= $this->head['description']; ?>">
        <meta name="twitter:image" content="<?= $this->head['urlBase'] . $this->head['opengraph']; ?>">
        <meta name="twitter:creator" content="<?= $this->head['twitter']['creator']; ?>">
        <!-- Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="<?= $this->head['url']; ?>">
        <meta property="og:title" content="<?= $this->head['title']; ?>">
        <meta property="og:description" content="<?= $this->head['description']; ?>">
        <meta property="og:image" content="<?= $this->head['urlBase'] . $this->head['opengraph']; ?>">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <!-- Favicon -->
        <!-- Link mask icon no compatible W3C → safari svg -->
        <link rel="apple-touch-icon" sizes="180x180" href="/fav/apple-touch-icon.png?<?= VERSION; ?>">
        <link rel="icon" type="image/png" sizes="32x32" href="/fav/favicon-32x32.png?<?= VERSION; ?>">
        <link rel="icon" type="image/png" sizes="16x16" href="/fav/favicon-16x16.png?<?= VERSION; ?>">
        <link rel="manifest" href="/fav/site.webmanifest">
        <meta name="msapplication-TileColor" content="#000">
        <meta name="theme-color" content="#fff">
        <link rel="shortcut icon" href="/fav/favicon.ico?<?= VERSION; ?>">
        <!-- Style -->
        <link rel="stylesheet" href="/css/app.css?<?= VERSION; ?>">
    </head>
    <body>
        <!-- App -->
        <main id="app">
            <!-- Xhr -->
            <div id="xhr">
                <?= $this->content; ?>
            </div>
            <!-- GL -->
            <canvas id="gl"></canvas>
            <!-- Sail -->
            <?php include ROOT . 'app/View/common/sail.php'; ?>
            <!-- Loader -->
            <?php include ROOT . 'app/View/common/loader.php'; ?>
            <!-- Grid -->
            <div id="grid-cta"></div>
            <!-- Svg -->
            <?php include ROOT . 'app/View/svg/svg.php'; ?>
            <!-- Issue -->
            <?php include ROOT . 'app/View/issue/enableJS.php'; ?>
        </main>
        <!-- Script -->
        <script>window._C={v:<?= VERSION; ?>};</script>
        <script src="/js/app.js?<?= VERSION; ?>"></script>
    </body>
</html>
