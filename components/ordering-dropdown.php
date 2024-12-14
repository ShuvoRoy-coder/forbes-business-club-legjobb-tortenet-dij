<?php
$order = isset($_GET['order']) ? $_GET['order'] : null;
?>

<div id="ordering-dropdown" class="dropdown ms-lg-4 ms-xxl-6">
    <button style="color: #D2B169;"
        class="btn btn-secondary dropdown-toggle fs-2 fs-md-3 fw-semibold text-start py-2 py-lg-3" type="button"
        id="orderingDropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
        <?php switch ($order):
    case 'name-asc': ?>
        Név
        <?php require('./components/arrow-up.php') ?>
        <?php break; ?>
        <?php
    case 'name-desc': ?>
        Név
        <?php require('./components/arrow-down.php') ?>
        <?php break; ?>
        <?php
    default: ?>
        Véletlenszerű
        <?php break; ?>
        <?php endswitch; ?>
    </button>
    <ul class="dropdown-menu" aria-labelledby="orderingDropdownMenuButton">
        <li data-index="0" <?php if ($order==null): ?> class="d-none"
            <?php endif ?>>
            <a class="dropdown-item fs-2 fs-md-3" href="#">
                Véletlenszerű
            </a>
        </li>
        <li data-index="1" <?php if ($order=='name-asc'): ?> class="d-none"
            <?php endif ?>>
            <a class="dropdown-item fs-2 fs-md-3" href="#" data-key="name-asc">
                Név
                <?php require('./components/arrow-up.php') ?>
            </a>
        </li>
        <li data-index="2" <?php if ($order=='name-desc'): ?> class="d-none"
            <?php endif ?>>
            <a class="dropdown-item fs-2 fs-md-3" href="#" data-key="name-desc">
                Név
                <?php require('./components/arrow-down.php') ?>
            </a>
        </li>
    </ul>
</div>