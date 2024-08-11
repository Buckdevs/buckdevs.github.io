<?php
include "functions.php";
$db = connect();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RandomPlayer</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css" integrity="sha384-r4NyP46KrjDleawBgD5tp8Y7UzmLA05oM1iAEQ17CSuDqnUK2+k9luXQOfXJCJ4I" crossorigin="anonymous">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js" integrity="sha384-oesi62hOLfzrys4LxRF63OJCXdXDipiYWBnvTl9Y9/TRlw5xlKIEHpNyvvDShgf/" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
</head>
<body>
    <main class="container text-center p-5">
        <figure class="p-4">
            <blockquote class="blockquote">
              <p>“Men will literally sit around and name random sports players for two hours instead of going to therapy”</p>
            </blockquote>
            <figcaption class="blockquote-footer">
              Unknown Author
            </figcaption>
          </figure>
          <?php
            $playerQuery = $db->query("SELECT price FROM services WHERE name = 'Wash'");
            $randomPlayer = $playerQuery->fetch(PDO::FETCH_ASSOC);
            $name = $randomPlayer['name'];
            $sport = $randomPlayer['sport'];
            
          ?>
          <div class="card m-auto" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title"><?=$name?></h5>
              <p class="card-text"><?=$sport?></p>
              <a href="index.php" class="btn btn-primary">Generate Another Player</a>
            </div>
          </div>
    </main>

    <footer class="text-center">
        <a href="#">Refresh</a>
    </footer>

</body>
</html>