<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <!-- Robots -->
        <meta name="robots" content="noindex, nofollow">
        <!-- Device -->
        <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1, user-scalable=no"> -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1, maximum-scale=5.0">
        <meta name="format-detection" content="telephone=no">
        <!-- SEO -->
        <title><?= $this->head['title']; ?></title>
        <!-- Favicon -->
        <!-- Link mask icon no compatible W3C → safari svg -->
        <link rel="apple-touch-icon" sizes="180x180" href="/fav/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/fav/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/fav/favicon-16x16.png">
        <link rel="manifest" href="/fav/site.webmanifest">
        <meta name="msapplication-TileColor" content="#000">
        <meta name="theme-color" content="#fff">
        <link rel="shortcut icon" href="/fav/favicon.ico">
        <!-- Style -->
        <link rel="stylesheet" href="/css/app.css">
    </head>
    <body>
        <main id="app">
            <div id="xhr">
                <div id="p404">
                    <a href="/" class="_ost">BACK TO HOME</a>
                </div>
            </div>
        </main>
        <?php include ROOT . 'app/View/issue/updateBrowser.php'; ?>
        <?php include ROOT . 'app/View/issue/enableJavascript.php'; ?>
        <!-- Script -->
        <script src="/js/app.js"></script>
    </body>
</html>
