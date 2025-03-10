<?php

namespace WeDevs\ERP\Settings;

/**
 * Email settings class
 */
class Email extends Template {
    
    /**
     * Class constructor
     */
    function __construct() {
        $this->id       = 'erp-email';
        $this->label    = __( 'Emails', 'erp' );
        $this->sections = $this->get_sections();
        $this->icon     = WPERP_ASSETS . '/images/wperp-settings/email.png';

        add_action( 'erp_admin_field_notification_emails', [ $this, 'notification_emails' ] );
        add_action( 'erp_admin_field_smtp_test_connection', [ $this, 'smtp_test_connection' ] );
        add_action( 'admin_footer', 'erp_email_settings_javascript' );
    }

    /**
     * Get registered tabs
     *
     * @return array
     */
    public function get_sections() {
        return apply_filters( 'erp_settings_email_sections', [
            'general'      => __( 'General', 'erp' ),
            'smtp'         => __( 'SMTP', 'erp' ),
            'notification' => __( 'Notifications & Templates', 'erp' )
        ] );
    }

    /**
     * Get sections fields
     *
     * @return array
     */
    public function get_section_fields( $section = '' ) {
        $fields['general'][] = [
            'title' => __( 'Email Sender Options', 'erp' ),
            'type'  => 'title',
            'desc'  => __( 'Email notification settings for ERP. Customize the look and feel of outgoing emails.', 'erp' ),
        ];

        $fields['general'][] = [
            'title'   => __( 'Sender Name', 'erp' ),
            'id'      => 'from_name',
            'type'    => 'text',
            'default' => get_bloginfo( 'name' ),
            'tooltip' => true,
            'desc'    => __( 'The senders name appears on the outgoing emails', 'erp' ),
        ];

        $fields['general'][] = [
            'title'   => __( 'Sender Address', 'erp' ),
            'id'      => 'from_email',
            'type'    => 'text',
            'default' => get_option( 'admin_email' ),
            'tooltip' => true,
            'desc'    => __( 'The senders email appears on the outgoing emails', 'erp' ),
        ];

        $fields['general'][] = [
            'title'             => __( 'Header Image', 'erp' ),
            'id'                => 'header_image',
            'type'              => 'text',
            'desc'              => __( 'Upload a logo/banner and provide the URL here.', 'erp' ),
            'tooltip'           => true,
            'custom_attributes' => [
                'placeholder' => 'http://example.com/path/to/logo.png',
            ],
        ];

        $fields['general'][] = [
            'title'   => __( 'Footer Text', 'erp' ),
            'id'      => 'footer_text',
            'type'    => 'textarea',
            'css'     => 'min-width:300px;',
            'tooltip' => true,
            'default' => sprintf( '%s  - Powered by WP ERP', get_bloginfo( 'name' ) ),
            'desc'    => __( 'The text apears on each emails footer area.', 'erp' ),
        ];

        $fields['general'][] = [
            'type' => 'sectionend', 'id' => 'script_styling_options',
        ];

        if ( ! empty( wperp()->emailer->get_emails() ) ) {
            $fields['general'][] = [
                'title' => __( 'Notification Emails', 'erp' ),
                'desc'  => __( 'Email notifications sent from WP ERP are listed below. Click on an email to configure it.', 'erp' ),
                'type'  => 'title',
                'id'    => 'email_notification_settings',
            ];

            $fields['general'][] = [
                'desc'  => '<ul class="email_tab_view"><li id="bt_hrm" class="bt_active">' . __( 'HRM', 'erp' ) . '</li><li id="bt_crm">' . __( 'CRM', 'erp' ) . '</li><li id="bt_accounting">' . __( 'Accounting', 'erp' ) . '</li><li id="bt_others">' . __( 'Others', 'erp' ) . '</li></ul>',
                'type'  => 'title',
                'id'    => 'email_notification_tab',
            ];

            $fields['general'][] = [
                'type' => 'notification_emails',
            ];
        }

        $fields['general'][] = [
            'type' => 'sectionend',
            'id'   => 'script_styling_options',
        ];
        // End general settings

        $fields['smtp'][] = [
            'title' => __( 'SMTP Options', 'erp' ),
            'type'  => 'title',
            'desc'  => __( 'Email outgoing settings for ERP.', 'erp' ),
        ];

        $fields['smtp'][] = [
            'title'   => __( 'Enable SMTP', 'erp' ),
            'id'      => 'enable_smtp',
            'type'    => 'radio',
            'options' => [ 'yes' => 'Yes', 'no' => 'No' ],
            'default' => 'no',
        ];

        $fields['smtp'][] = [
            'title'             => __( 'Mail Server', 'erp' ),
            'id'                => 'mail_server',
            'type'              => 'text',
            'custom_attributes' => [
                'placeholder' => 'smtp.gmail.com',
            ],
            'desc'              => __( 'SMTP host address.', 'erp' ),
        ];

        $fields['smtp'][] = [
            'title' => __( 'Port', 'erp' ),
            'id'    => 'port',
            'type'  => 'text',
            'desc'  => __( 'SSL: 465<br> TLS: 587', 'erp' ),
        ];

        $fields['smtp'][] = [
            'title'   => __( 'Authentication', 'erp' ),
            'id'      => 'authentication',
            'type'    => 'select',
            'desc'    => __( 'Authentication type.', 'erp' ),
            'options' => [ '' => __( 'None', 'erp' ), 'ssl' => __( 'SSL', 'erp' ), 'tls' => __( 'TLS', 'erp' ) ],
        ];

        $fields['smtp'][] = [
            'title'             => __( 'Username', 'erp' ),
            'id'                => 'username',
            'type'              => 'text',
            'custom_attributes' => [
                'placeholder' => 'email@example.com',
            ],
            'desc'              => __( 'Your email id.', 'erp' ),
        ];

        $fields['smtp'][] = [
            'title' => __( 'Password', 'erp' ),
            'id'    => 'password',
            'type'  => 'password',
            'desc'  => __( 'Your email password.', 'erp' ),
        ];

        $fields['smtp'][] = [
            'title'   => __( 'Enable Debugging', 'erp' ),
            'id'      => 'debug',
            'type'    => 'radio',
            'options' => [ 'yes' => 'Yes', 'no' => 'No' ],
            'default' => 'no',
        ];

        $fields['smtp'][] = [
            'title'       => __( 'Testing', 'erp' ),
            'id'          => 'test_email',
            'type'        => 'text',
            'value'       => get_option( 'admin_email' ),
            'placeholder' => get_option( 'admin_email' ),
            'tooltip'     => true,
            'desc'        => __( 'Test if the SMTP connection is correctly established', 'erp' ),
        ];

        $fields['smtp'][] = [
            'type' => 'sectionend',
            'id'   => 'script_styling_options',
        ];
        // End SMTP settings

        // Notification & Templates settings
        $fields['notification'][] = [
            'title' => __( 'Notification & Template Settings', 'erp' ),
            'type'  => 'title',
            'desc'  => __( 'Email notifications and templates management for ERP', 'erp' ),
        ];

        $fields['notification']['sub_sections'] = [
            'hrm'  => __( 'HRM', 'erp' ),
            'crm'  => __( 'CRM', 'erp' ),
            'acct' => __( 'Accounting', 'erp' ),
        ];
        // End of Notification & Templates settings

        $fields = apply_filters( 'erp_settings_email_section_fields', $fields, $section );

        return $fields;
    }

    public function notification_emails() {
        $email_templates = wperp()->emailer->get_emails();

        //ob_start(); ?>
        <tr valign="top">
            <td class="erp-settings-table-wrapper" colspan="2">
                <table class="erp-settings-table widefat" cellspacing="0">
                    <thead>
                    <tr>
                        <?php
                        $columns = apply_filters( 'erp_email_setting_columns', [
                            'name'        => __( 'Email', 'erp' ),
                            'description' => __( 'Description', 'erp' ),
                            'actions'     => '',
                        ] );

        foreach ( $columns as $key => $column ) {
            echo '<th class="erp-settings-table-' . esc_attr( $key ) . '">' . esc_html( $column ) . '</th>';
        } ?>
                    </tr>
                    </thead>
                    <tbody id="email_list_view">
                    <?php
                    foreach ( $email_templates as $email_key => $email ) {
                        if ( strpos( get_class( $email ), 'HRM' ) !== false ||
                            strpos( get_class( $email ), 'ERP_Document' ) !== false ||
                            strpos( get_class( $email ), 'ERP_Recruitment' ) !== false ||
                            strpos( get_class( $email ), 'Training' ) !== false
                        ) {
                            $tr_class = 'hrm';
                        } elseif ( strpos( get_class( $email ), 'CRM' ) !== false ) {
                            $tr_class = 'crm';
                        } elseif ( strpos( get_class( $email ), 'Accounting' ) !== false ) {
                            $tr_class = 'accounting';
                        } else {
                            $tr_class = 'others';
                        }

                        echo '<tr class="tag_' . $tr_class . '">';

                        foreach ( $columns as $key => $column ) {
                            switch ( $key ) {
                                case 'name':
                                    echo '<td class="erp-settings-table-' . esc_attr( $key ) . '">
                                            <a href="' . esc_url( admin_url( 'admin.php?page=erp-settings&tab=erp-email&section=general&sub_section=' . esc_attr( strtolower( $email_key ) ) ) ) . '">' . esc_html( $email->get_title() ) . '</a>
                                        </td>';
                                    break;

                                case 'status':
                                case 'module':
                                case 'recipient':
                                    echo '<td class="erp-settings-table-' . esc_attr( $key ) . '">

                                        </td>';
                                    break;

                                case 'description':
                                    echo '<td class="erp-settings-table-' . esc_attr( $key ) . '">
                                            <span class="help">' . esc_html( $email->get_description() ) . '</span>
                                        </td>';
                                    break;

                                case 'actions':
                                    echo '<td class="erp-settings-table-' . esc_attr( $key ) . '">
                                            <a class="button alignright" href="' . esc_url( admin_url( 'admin.php?page=erp-settings&tab=erp-email&section=general&sub_section=' . strtolower( $email_key ) ) ) . '">' . esc_html__( 'Configure', 'erp' ) . '</a>
                                        </td>';
                                    break;

                                default:
                                    do_action( 'erp_email_setting_column_' . $key, $email );
                                    break;
                            }
                        }
                    } ?>
                    </tbody>
                </table>
            </td>
        </tr>
        <?php //return ob_get_clean();
    }

    /**
     * Get IMAP Settings Fields.
     *
     * @return array
     */
    protected function get_imap_settings_fields() {
        if ( !extension_loaded( 'imap' ) || !function_exists( 'imap_open' ) ) {
            $fields[] = [
                'title' => __( 'IMAP/POP3 Options', 'erp' ),
                'type'  => 'title',
                'desc'  => sprintf(
                    '%s' . __( 'Your server does not have PHP IMAP extension loaded. To enable this feature, please contact your hosting provider and ask to enable PHP IMAP extension.', 'erp' ) . '%s',
                    '<section class="notice notice-warning"><p>',
                    '</p></section>'
                ),
            ];

            return $fields;
        }

        $fields[] = [
            'title' => __( 'IMAP/POP3 Options', 'erp' ),
            'type'  => 'title',
            'desc'  => __( 'Email incoming settings for ERP.', 'erp' ),
        ];

        $fields[] = [
            'type' => 'imap_status',
        ];

        $fields[] = [
            'title'   => __( 'Enable IMAP', 'erp' ),
            'id'      => 'enable_imap',
            'type'    => 'radio',
            'options' => [ 'yes' => 'Yes', 'no' => 'No' ],
            'default' => 'no',
        ];

        $schedules = wp_get_schedules();

        $cron_schedules = [];

        foreach ( $schedules as $key => $value ) {
            $cron_schedules[$key] = $value['display'];
        }

        $fields[] = [
            'title'   => __( 'Cron Schedule', 'erp' ),
            'id'      => 'schedule',
            'type'    => 'select',
            'desc'    => __( 'Interval time to run cron.', 'erp' ),
            'options' => $cron_schedules,
            'default' => 'hourly',
        ];

        $fields[] = [
            'title'             => __( 'Mail Server', 'erp' ),
            'id'                => 'mail_server',
            'type'              => 'text',
            'custom_attributes' => [
                'placeholder' => 'imap.gmail.com',
            ],
            'desc'              => __( 'IMAP/POP3 host address.', 'erp' ),
        ];

        $fields[] = [
            'title'             => __( 'Username', 'erp' ),
            'id'                => 'username',
            'type'              => 'text',
            'desc'              => __( 'Your email id.', 'erp' ),
            'custom_attributes' => [
                'placeholder' => 'email@example.com',
            ],
        ];

        $fields[] = [
            'title' => __( 'Password', 'erp' ),
            'id'    => 'password',
            'type'  => 'password',
            'desc'  => __( 'Your email password.', 'erp' ),
        ];

        $fields[] = [
            'title'   => __( 'Protocol', 'erp' ),
            'id'      => 'protocol',
            'type'    => 'select',
            'desc'    => __( 'Protocol type.', 'erp' ),
            'options' => [ 'imap' => __( 'IMAP', 'erp' ), 'pop3' => __( 'POP3', 'erp' ) ],
            'default' => 'imap',
        ];

        $fields[] = [
            'title' => __( 'Port', 'erp' ),
            'id'    => 'port',
            'type'  => 'text',
            'desc'  => __( 'IMAP: 993<br> POP3: 995', 'erp' ),
        ];

        $fields[] = [
            'title'   => __( 'Authentication', 'erp' ),
            'id'      => 'authentication',
            'type'    => 'select',
            'options' => [ 'ssl' => __( 'SSL', 'erp' ), 'tls' => __( 'TLS', 'erp' ), 'notls' => __( 'None', 'erp' ) ],
            'default' => 'ssl',
            'desc'    => __( 'Authentication type.', 'erp' ),
        ];

        $fields[] = [
            'type' => 'imap_test_connection',
        ];

        $fields[] = [
            'id'      => 'imap_status',
            'type'    => 'hidden',
            'default' => 0,
        ];

        $fields[] = [
            'type' => 'sectionend',
            'id'   => 'script_styling_options',
        ];

        return $fields;
    }

    /**
     * Output the settings.
     */
    public function output( $section = false ) {
        if ( !isset( $_GET['sub_section'] ) ) {
            parent::output( $section );

            return;
        }

        $current_section = isset( $_GET['sub_section'] ) ? sanitize_key( $_GET['sub_section'] ) : false;

        // Define emails that can be customised here
        $email_templates = wperp()->emailer->get_emails();

        if ( $current_section ) {
            foreach ( $email_templates as $email_key => $email ) {
                if ( strtolower( $email_key ) == $current_section ) {
                    $email->admin_options();
                    break;
                }
            }
        } else {
            parent::output();
        }
    }

    public function save( $section = false ) {
        global $current_class;

        if ( isset( $_POST['_wpnonce'] ) && wp_verify_nonce( sanitize_key( $_POST['_wpnonce'] ), 'erp-settings-nonce' ) ) {
            $from_sections = false;

            if ( isset( $this->sections ) && is_array( $this->sections ) && count( $this->sections ) ) {
                $options       = $this->get_section_fields( $section );
                $options       = $options[ $section ];
                $from_sections = true;
            } else {
                $options = $this->get_settings();
            }

            // Modify options data for some sub sections
            $sub_section = isset( $_POST['sub_section' ] ) ? sanitize_text_field( wp_unslash( $_POST['sub_section' ] ) ) : null;

            if ( ! empty ( $sub_sub_section ) ) {
                $options = $options[ $sub_sub_section ];
            }

            // Options to update will be stored here
            $update_options = [];

            // Loop options and get values to save
            foreach ( $options as $value ) {
                if ( ! isset( $value['id'] ) ) {
                    continue;
                }

                $option_value = $this->parse_option_value( $value );

                if ( ! is_null( $option_value ) ) {
                    // Check if option is an array
                    if ( strstr( $value['id'], '[' ) ) {
                        parse_str( $value['id'], $option_array );

                        // Option name is first key
                        $option_name = current( array_keys( $option_array ) );

                        // Get old option value
                        if ( ! isset( $update_options[ $option_name ] ) ) {
                            $update_options[ $option_name ] = get_option( $option_name, [] );
                        }

                        if ( ! is_array( $update_options[ $option_name ] ) ) {
                            $update_options[ $option_name ] = [];
                        }

                        // Set keys and value
                        $key = key( $option_array[ $option_name ] );

                        $update_options[ $option_name ][ $key ] = $option_value;

                    // Single value
                    } else {
                        $update_options[ $value['id'] ] = $option_value;
                    }
                }

                // Custom handling
                do_action( 'erp_update_option', $value );
            }

            // finally, update the option
            if ( $update_options ) {
                if ( $this->single_option ) {
                    foreach ( $update_options as $name => $value ) {
                        update_option( $name, $value );
                    }
                } else {
                    update_option( $this->get_option_id(), $update_options );
                }
            }

            do_action( 'erp_after_save_settings' );
        }
    }
}

// return new Email();
