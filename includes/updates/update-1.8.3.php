<?php

/*
 * Add result and result_type column in `erp_hr_education` table
 */
function erp_acct_alter_table_erp_hr_education_1_8_3() {
    global $wpdb;

    $cols = $wpdb->get_col( "DESC {$wpdb->prefix}erp_hr_education" );

    if ( ! in_array( 'result', $cols ) ) {
        $wpdb->query(
            $wpdb->prepare(
                "ALTER TABLE `{$wpdb->prefix}erp_hr_education` ADD `result` decimal(4,3) NULL DEFAULT '0' AFTER `field`;"
            )
        );
    }

    if ( ! in_array( 'result_type', $cols ) ) {
        $wpdb->query(
            $wpdb->prepare(
                "ALTER TABLE `{$wpdb->prefix}erp_hr_education` ADD `result_type` ENUM('cgpa','gpa') NULL DEFAULT NULL AFTER `result`;"
            )
        );
    }
}

erp_acct_alter_table_erp_hr_education_1_8_3();
