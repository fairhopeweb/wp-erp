/* jshint devel:true */
/* global wpErpHr */
/* global wp */

;(function($) {
    'use strict';

    var WeDevs_ERP_HR = {

        /**
         * Initialize the events
         *
         * @return {void}
         */
        initialize: function() {
            self = this;
            // Dasboard Overview
            $( 'ul.erp-dashboard-announcement' ).on( 'click', 'a.mark-read', this.dashboard.markAnnouncementRead );
            $( 'ul.erp-dashboard-announcement' ).on( 'click', 'a.view-full', this.dashboard.viewAnnouncement );
            $( 'ul.erp-dashboard-announcement' ).on( 'click', '.announcement-title a', this.dashboard.viewAnnouncementTitle );

            // Birthday Wish
            $( 'ul.erp-list' ).on( 'click', '.send-wish', this.dashboard.sendBirthdayWish );

            // Department
            $( 'body' ).on( 'click', 'a#erp-new-dept', this.department.create );
            $( '.erp-hr-depts' ).on( 'click', 'a.submitdelete', this.department.remove );
            $( '.erp-hr-depts' ).on( 'click', 'span.edit a', this.department.edit );

            // Designation
            $( 'body' ).on( 'click', 'a#erp-new-designation', this.designation.create );
            $( '.erp-hr-designation' ).on( 'click', 'a.submitdelete', this.designation.remove );
            $( '.erp-hr-designation' ).on( 'click', 'span.edit a', this.designation.edit );

            // employee
            $( '.erp-hr-employees' ).on( 'click', 'a#erp-employee-new', this.employee.create );
            $( '.erp-hr-employees' ).on( 'click', 'span.edit a', this.employee.edit );
            $( '.erp-hr-employees' ).on( 'click', 'a.submitdelete', this.employee.remove );
            $( '.erp-hr-employees' ).on( 'click', 'a.submitrestore', this.employee.restore );
            $( '.erp-hr-employees' ).on( 'click', 'a#erp-empl-type', this.employee.updateJobStatus );
            $( '.erp-hr-employees' ).on( 'click', 'a#erp-empl-status', this.employee.updateJobStatus );
            $( '.erp-hr-employees' ).on( 'click', 'a#erp-empl-compensation', this.employee.updateJobStatus );
            $( '.erp-hr-employees' ).on( 'click', 'a#erp-empl-jobinfo', this.employee.updateJobStatus );
            $( '.erp-hr-employees' ).on( 'click', 'td.action a.remove', this.employee.removeHistory );
            $( '.erp-hr-employees' ).on( 'click', 'td.action a.edit', this.employee.editHistory );
            $( '.erp-hr-employees' ).on( 'click', 'a#erp-employee-print', this.employee.printData );
            $( 'body' ).on( 'focusout', 'input#erp-hr-user-email', this.employee.checkUserEmail );
            $( 'body' ).on( 'click', 'a#erp-hr-create-wp-user-to-employee', this.employee.makeUserEmployee );

            // Single Employee
            $( '.erp-employee-single' ).on( 'click', 'a#erp-employee-terminate', this.employee.terminateEmployee );
            // $( '.erp-employee-single' ).on( 'click', 'a#erp-employee-activate', this.employee.activateEmployee ); // @TODO: Needs to modify it later. :p
            $( '.erp-employee-single' ).on( 'click', 'input#erp-hr-employee-status-update', this.employee.changeEmployeeStatus );

            // Performance
            $( '.erp-hr-employees' ).on( 'click', 'a#erp-empl-performance-reviews', this.employee.updatePerformance );
            $( '.erp-hr-employees' ).on( 'click', 'a#erp-empl-performance-comments', this.employee.updatePerformance );
            $( '.erp-hr-employees' ).on( 'click', 'a#erp-empl-performance-goals', this.employee.updatePerformance );
            $( '.erp-hr-employees' ).on( 'click', '.performance-tab-wrap td.action a.performance-remove', this.employee.removePerformance );
            // work experience
            $( '.erp-hr-employees' ).on( 'click', 'a#erp-empl-add-exp', this.employee.general.create );
            $( '.erp-hr-employees' ).on( 'click', 'a.work-experience-edit', this.employee.general.create );
            $( '.erp-hr-employees' ).on( 'click', 'a.work-experience-delete', this.employee.general.remove );

            // education
            $( '.erp-hr-employees' ).on( 'click', 'a#erp-empl-add-education', this.employee.general.create );
            $( '.erp-hr-employees' ).on( 'click', 'a.education-edit', this.employee.general.create );
            $( '.erp-hr-employees' ).on( 'click', 'a.education-delete', this.employee.general.remove );
            $( 'body' ).on( 'change', '#result_type', self, this.employee.general.selectResultType );

            // dependent
            $( '.erp-hr-employees' ).on( 'click', 'a#erp-empl-add-dependent', this.employee.general.create );
            $( '.erp-hr-employees' ).on( 'click', 'a.dependent-edit', this.employee.general.create );
            $( '.erp-hr-employees' ).on( 'click', 'a.dependent-delete', this.employee.general.remove );

            // notes
            $( '.erp-hr-employees' ).on( 'submit', '.note-tab-wrap form', this.employee.addNote );
            $( '.erp-hr-employees' ).on( 'click', '.note-tab-wrap input#erp-load-notes', this.employee.loadNotes );
            $( '.erp-hr-employees' ).on( 'click', '.note-tab-wrap a.delete_note', this.employee.deleteNote );

            // photos
            $( 'body' ).on( 'click', 'a#erp-set-emp-photo', this.employee.setPhoto );
            $( 'body' ).on( 'click', 'a.erp-remove-photo', this.employee.removePhoto );

            // Trigger
            $( 'body' ).on( 'erp-hr-after-new-dept', this.department.afterNew );
            $( 'body' ).on( 'erp-hr-after-new-desig', this.designation.afterNew );

            $( 'body' ).on( 'change', '.wp-list-table', function(e) {
                var selector = $('.wp-list-table tbody tr th input[type="checkbox"]');

                if ( selector.is(':checked') ) {
                    $('.tablenav .bulkactions').show();
                    $(".tablenav").css("clear", "both");
                    $(".wperp-filter-dropdown").css("margin-top", "-63px");
                } else {
                    $('.tablenav .bulkactions').hide();
                    $(".tablenav").css("clear", "none");
                    $(".wperp-filter-dropdown").css("margin-top", "-53px");
                }
            });

            $('body').on( 'click', '.wperp-filter-dropdown a', this.employee.toggleFilterDropdown );

            $( 'body' ).on( 'click', 'input[name="hide_filter"]', function(e) {
                e.preventDefault();
                self.employee.toggleFilterDropdown();
            });

            $( 'body' ).on( 'click', 'input[name="reset_filter"]', function(e) {
                e.preventDefault();
                $( '#filter_designation option:selected' ).prop( 'selected', false );
                $( '#filter_department option:selected' ).prop( 'selected', false );
                $( '#filter_employment_type option:selected' ).prop( 'selected', false );
                $( 'input[name=filter_employee]' ).click();
            });

            $( '#erp-hr-employee-import-csv' ).on( 'click', this.employee.importCsv );
            $( '#erp-hr-employee-export-csv' ).on( 'click', this.employee.exportCsv );

            this.showRequestNotification();
            this.initTipTip();
        },

        initToggleCheckbox: function() {
            var lastClicked = false;

            // check all checkboxes
            $('tbody').children().children('.check-column').find(':checkbox').click( function(e) {
                if ( 'undefined' == e.shiftKey ) { return true; }
                if ( e.shiftKey ) {
                    if ( ! lastClicked ) {
                        return true;
                    }

                    checks  = $( lastClicked ).closest( 'form' ).find( ':checkbox' ).filter( ':visible:enabled' );
                    first   = checks.index( lastClicked );
                    last    = checks.index( this );
                    checked = $(this).prop('checked');

                    if ( 0 < first && 0 < last && first != last ) {
                        sliced = ( last > first ) ? checks.slice( first, last ) : checks.slice( last, first );
                        sliced.prop( 'checked', function() {
                            if ( $(this).closest('tr').is(':visible') )
                                return checked;

                            return false;
                        });
                    }
                }

                lastClicked = this;

                // toggle "check all" checkboxes
                var unchecked = $(this).closest('tbody').find(':checkbox').filter(':visible:enabled').not(':checked');
                $(this).closest('table').children('thead, tfoot').find(':checkbox').prop('checked', function() {
                    return ( 0 === unchecked.length );
                });

                return true;
            });

            $('thead, tfoot').find('.check-column :checkbox').on( 'click.wp-toggle-checkboxes', function( event ) {
                var $this          = $(this),
                    $table         = $this.closest( 'table' ),
                    controlChecked = $this.prop('checked'),
                    toggle         = event.shiftKey || $this.data('wp-toggle');

                $table.children( 'tbody' ).filter(':visible')
                    .children().children('.check-column').find(':checkbox')
                    .prop('checked', function() {
                        if ( $(this).is(':hidden,:disabled') ) {
                            return false;
                        }

                        if ( toggle ) {
                            return ! $(this).prop( 'checked' );
                        } else if ( controlChecked ) {
                            return true;
                        }

                        return false;
                    });

                $table.children('thead,  tfoot').filter(':visible')
                    .children().children('.check-column').find(':checkbox')
                    .prop('checked', function() {
                        if ( toggle ) {
                            return false;
                        } else if ( controlChecked ) {
                            return true;
                        }

                        return false;
                    });
            });
        },

        initTipTip: function() {
            $( '.erp-tips' ).tipTip( {
                defaultPosition: "top",
                fadeIn: 100,
                fadeOut: 100
            } );
        },

        requiredAlert: function( action ) {
            var count = 0;
            var selector = ( action === 'edit' ) ? '#erp-employee-edit form' : '#erp-new-employee-popup form';

            $( selector ).find( 'input, select, textarea' ).each( function() {
                if( $(this).prop('required') && $(this).val() === '' ) {
                    count++;
                }
            });

            if( count ) {
                var notice = wpErpHr.required_field_notice.replace('{count}', count);
                swal( '', notice , 'warning' );
            }
        },

        initDateField: function() {
            $( '.erp-date-field').datepicker({
                dateFormat: 'yy-mm-dd',
                changeMonth: true,
                changeYear: true,
                yearRange: '-100:+100',
            });
        },

        reloadPage: function() {
            $( '.erp-area-left' ).load( window.location.href + ' #erp-area-left-inner', function() {
                $('.select2').select2();
            } );
        },

        ajaxReq: function(data, modal) {
            wp.ajax.send( {
                data: data,
                success: function() {
                    WeDevs_ERP_HR.reloadPage();
                    modal.closeModal();
                },
                error: function(error) {
                    modal.enableButton();
                    modal.showError( error );
                }
            });
        },

        showRequestNotification: function() {
            var selector = ".erp-custom-menu-container .erp-nav .requests a",
                child    = "span.erp-notification",
                pending  = 0;

            wp.ajax.send({
                data: {
                    action: 'erp_hr_get_total_pending_requests'
                },
                success: function(response) {
                    pending = response;
                },
                error: function(error) {
                    pending = 0;
                }
            })
            .then( function() {
                if ( pending > 0 ) {
                    if ( ! $( selector ).find( child ).length ) {
                        $( selector ).append( ' <span class="erp-notification">' + pending + '</span>' );
                    } else {
                        $( selector + ' ' + child ).html( pending );
                    }
                }
            });
        },

        dashboard : {
            markAnnouncementRead: function(e) {
                e.preventDefault();
                var self = $(this);

                if ( ! self.closest( 'li' ).hasClass('unread') ) {
                    return;
                }

                wp.ajax.send( 'erp_hr_announcement_mark_read', {
                    data: {
                        id : self.data( 'row_id' ),
                        _wpnonce: wpErpHr.nonce
                    },
                    success: function(res) {
                        self.closest( 'li' ).removeClass( 'unread' ).addClass( 'read' );
                        self.addClass( 'erp-hide' );
                    },
                    error: function(error) {
                        alert( error );
                    }
                });
            },

            viewAnnouncementTitle: function(e) {
                e.preventDefault();
                var self = $(this).closest( 'li' ).find( 'a.view-full' );
                wp.ajax.send( 'erp_hr_announcement_view', {
                    data: {
                        id : self.data( 'row_id' ),
                        _wpnonce: wpErpHr.nonce
                    },
                    success: function(res) {
                        $.erpPopup({
                            title: res.title,
                            button: '',
                            id: 'erp-hr-announcement',
                            content: '<p>'+ res.content +'</p>',
                            extraClass: 'midium',
                        });
                        self.closest( 'li' ).removeClass( 'unread' );
                        self.siblings( '.mark-read' ).addClass( 'erp-hide' );
                    },
                    error: function(error) {
                        alert( error );
                    }
                });
            },

            viewAnnouncement: function(e) {
                e.preventDefault();
                var self = $(this);

                wp.ajax.send( 'erp_hr_announcement_view', {
                    data: {
                        id : self.data( 'row_id' ),
                        _wpnonce: wpErpHr.nonce
                    },
                    success: function(res) {
                        $.erpPopup({
                            title: res.title,
                            button: '',
                            id: 'erp-hr-announcement',
                            content: '<p>'+ res.content +'</p>',
                            extraClass: 'midium',
                        });
                        self.closest( 'li' ).removeClass( 'unread' );
                        self.siblings( '.mark-read' ).addClass( 'erp-hide' );
                    },
                    error: function(error) {
                        alert( error );
                    }
                });
            },

            sendBirthdayWish: function(e) {
                e.preventDefault();
                var self = $(this);

                $('.wait').show();

                self.find('i').hide();

                wp.ajax.send('erp_hr_birthday_wish', {
                    data: {
                        employee_user_id: self.data('user_id'),
                        _wpnonce: wpErpHr.nonce
                    },
                    success: function(res) {
                        $('.wait').hide();
                        alert(res);
                    },
                    error: function(error) {
                        alert(error);
                    }
                });
            }
        },

        department: {

            /**
             * After create new department
             *
             * @return {void}
             */
            afterNew: function( e, res ) {
                var selectdrop = $('.erp-hr-dept-drop-down');
                wperp.scriptReload( 'erp_hr_script_reload', 'tmpl-erp-new-employee' );
                selectdrop.append('<option selected="selected" value="'+res.id+'">'+res.title+'</option>');
                selectdrop.select2().select2("val", res.id);
            },

            /**
             * Reload the department area
             *
             * @return {void}
             */
            reload: function() {
                $( '#erp-dept-table-wrap' ).load( window.location.href + ' #erp-dept-table-wrap', function() {
                    WeDevs_ERP_HR.initToggleCheckbox();
                } );
            },

            /**
             * Template reload after insert, edit, delete
             *
             * @return {void}
             */
            tempReload: function() {
                wperp.scriptReload( 'erp_hr_new_dept_tmp_reload', 'tmpl-erp-new-dept' );
            },

            /**
             * Create new department
             *
             * @param  {event}
             */
            create: function(e) {
                e.preventDefault();
                var self = $(this),
                    is_single = self.data('single');

                $.erpPopup({
                    title: wpErpHr.popup.dept_title,
                    button: wpErpHr.popup.dept_submit,
                    id: 'erp-hr-new-department',
                    content: wperp.template('erp-new-dept')().trim(),
                    extraClass: 'smaller',
                    onSubmit: function(modal) {
                        wp.ajax.send( {
                            data: this.serialize(),
                            success: function(res) {
                                WeDevs_ERP_HR.department.reload();

                                if ( is_single != '1' ) {
                                    $('body').trigger( 'erp-hr-after-new-dept', [res]);
                                } else {
                                    WeDevs_ERP_HR.department.tempReload();
                                }

                                modal.closeModal();
                            },
                            error: function(error) {
                                modal.showError( error );
                            }
                        });
                    }
                }); //popup
            },

            /**
             * Edit a department in popup
             *
             * @param  {event}
             */
            edit: function(e) {
                e.preventDefault();

                var self = $(this);

                $.erpPopup({
                    title: wpErpHr.popup.dept_update,
                    button: wpErpHr.popup.dept_update,
                    id: 'erp-hr-new-department',
                    content: wp.template('erp-new-dept')().trim(),
                    extraClass: 'smaller',
                    onReady: function() {
                        var modal = this;

                        $( 'header', modal).after( $('<div class="loader"></div>').show() );

                        wp.ajax.send( 'erp-hr-get-dept', {
                            data: {
                                id: self.data('id'),
                                _wpnonce: wpErpHr.nonce
                            },
                            success: function(response) {
                                $( '.loader', modal).remove();

                                $('#dept-title', modal).val( response.name );
                                $('#dept-desc', modal).val( response.data.description );
                                $('#dept-parent', modal).val( response.data.parent );
                                $('#dept-lead', modal).val( response.data.lead );
                                $('#dept-id', modal).val( response.id );
                                $('#dept-action', modal).val( 'erp-hr-update-dept' );

                                // disable current one
                                $('#dept-parent option[value="' + self.data('id') + '"]', modal).attr( 'disabled', 'disabled' );

                            }
                        });
                    },
                    onSubmit: function(modal) {
                        wp.ajax.send( {
                            data: this.serialize(),
                            success: function() {
                                WeDevs_ERP_HR.department.reload();
                                WeDevs_ERP_HR.department.tempReload();
                                modal.closeModal();
                            },
                            error: function(error) {
                                modal.showError( error );
                            }
                        });
                    }
                });
            },

            /**
             * Delete a department
             *
             * @param  {event}
             */
            remove: function(e) {
                e.preventDefault();

                var self = $(this);

                if ( confirm( wpErpHr.delConfirmDept ) ) {
                    wp.ajax.send( 'erp-hr-del-dept', {
                        data: {
                            '_wpnonce': wpErpHr.nonce,
                            id: self.data( 'id' )
                        },
                        success: function() {
                            self.closest('tr').fadeOut( 'fast', function() {
                                $(this).remove();
                                WeDevs_ERP_HR.department.tempReload();
                            });
                        },
                        error: function(response) {
                            alert( response );
                        }
                    });
                }
            },

        },

        designation: {

            /**
             * After create new desination
             *
             * @return {void}
             */
            afterNew: function( e, res ) {
                var selectdrop = $('.erp-hr-desi-drop-down');
                wperp.scriptReload( 'erp_hr_script_reload', 'tmpl-erp-new-employee' );
                selectdrop.append('<option selected="selected" value="'+res.id+'">'+res.title+'</option>');
                WeDevs_ERP_HR.employee.select2AddMoreActive('erp-hr-desi-drop-down');
                selectdrop.select2("val", res.id);
            },

            /**
             * Reload the department area
             *
             * @return {void}
             */
            reload: function() {
                $( '.erp-hr-designation' ).load( window.location.href + ' .erp-hr-designation', function() {
                    WeDevs_ERP_HR.initToggleCheckbox();
                } );
            },

            /**
             * Create designation
             *
             * @param  {event}
             *
             * @return {void}
             */
            create: function(e) {
                e.preventDefault();
                var is_single = $(this).data('single');
                $.erpPopup({
                    title: wpErpHr.popup.desig_title,
                    button: wpErpHr.popup.desig_submit,
                    id: 'erp-hr-new-designation',
                    content: wp.template( 'erp-new-desig' )().trim(),
                    extraClass: 'smaller',
                    onSubmit: function(modal) {
                        wp.ajax.send( {
                            data: this.serialize(),
                            success: function(res) {
                                WeDevs_ERP_HR.designation.reload();
                                if ( is_single != '1' ) {
                                    $('body').trigger( 'erp-hr-after-new-desig', [res] );
                                }
                                modal.closeModal();
                            },
                            error: function(error) {
                                modal.showError( error );
                            }
                        });
                    }
                });
            },

            /**
             * Edit a department in popup
             *
             * @param  {event}
             */
            edit: function(e) {
                e.preventDefault();

                var self = $(this);

                $.erpPopup({
                    title: wpErpHr.popup.desig_update,
                    button: wpErpHr.popup.desig_update,
                    content: wp.template( 'erp-new-desig' )().trim(),
                    id: 'erp-hr-new-designation',
                    extraClass: 'smaller',
                    onReady: function() {
                        var modal = this;

                        $( 'header', modal).after( $('<div class="loader"></div>').show() );

                        wp.ajax.send( 'erp-hr-get-desig', {
                            data: {
                                id: self.data('id'),
                                _wpnonce: wpErpHr.nonce
                            },
                            success: function(response) {
                                $( '.loader', modal).remove();

                                $('#desig-title', modal).val( response.name );
                                $('#desig-desc', modal).val( response.data.description );
                                $('#desig-id', modal).val( response.id );
                                $('#desig-action', modal).val( 'erp-hr-update-desig' );
                            }
                        });
                    },
                    onSubmit: function(modal) {
                        wp.ajax.send( {
                            data: this.serialize(),
                            success: function() {
                                WeDevs_ERP_HR.designation.reload();

                                modal.closeModal();
                            },
                            error: function(error) {
                                modal.showError( error );
                            }
                        });
                    }
                });
            },

            /**
             * Delete a department
             *
             * @param  {event}
             */
            remove: function(e) {
                e.preventDefault();

                var self = $(this);

                if ( confirm( wpErpHr.delConfirmDept ) ) {
                    wp.ajax.send( 'erp-hr-del-desig', {
                        data: {
                            '_wpnonce': wpErpHr.nonce,
                            id: self.data( 'id' )
                        },
                        success: function() {
                            self.closest('tr').fadeOut( 'fast', function() {
                                $(this).remove();
                            });
                        },
                        error: function(response) {
                            alert( response );
                        }
                    });
                }
            },
        },

        employee: {

            /**
             * Reload the department area
             *
             * @return {void}
             */
            reload: function() {
                $( '.erp-hr-employees-wrap' ).load( window.location.href + ' .erp-hr-employees-wrap-inner', function() {
                    WeDevs_ERP_HR.initToggleCheckbox();
                } );
            },

            /**
             * Set photo popup
             *
             * @param {event}
             */
            setPhoto: function(e) {
                e.preventDefault();
                e.stopPropagation();

                var frame;

                if ( frame ) {
                    frame.open();
                    return;
                }

                frame = wp.media({
                    title: wpErpHr.emp_upload_photo,
                    button: { text: wpErpHr.emp_set_photo }
                });

                frame.on('select', function() {
                    var selection = frame.state().get('selection');

                    selection.map( function( attachment ) {
                        attachment = attachment.toJSON();

                        var html = '<img src="' + attachment.url + '" alt="" />';
                        html += '<input type="hidden" id="emp-photo-id" name="personal[photo_id]" value="' + attachment.id + '" />';
                        html += '<a href="#" class="erp-remove-photo">&times;</a>';

                        $( '.photo-container', '.erp-employee-form' ).html( html );
                    });
                });

                frame.open();
            },

            /**
             * Remove an employees avatar
             *
             * @param  {event}
             */
            removePhoto: function(e) {
                e.preventDefault();

                var mystery_person = wpErpHr.asset_url + '/images/mystery-person.png';

                var html = '<img src="' + mystery_person + '" alt="">';
                html += '<input type="hidden" name="personal[photo_id]" id="emp-photo-id" value="0">';
                html += '<a href="#" id="erp-set-emp-photo" class="button-primary"><i class="fa fa-cloud-upload"></i>' + wpErpHr.emp_upload_photo + '</a>';

                $( '.photo-container', '.erp-employee-form' ).html( html );
            },

            /**
             * Import employee from CSV
             * 
             * @param {event} e
             */
            importCsv: function(e) {
                if ( typeof e !== 'undefined' ) {
                    e.preventDefault();
                }

                var self = $(this);

                $.erpPopup({
                    title: self.data('title'),
                    button: self.data('btn'),
                    id: 'erp-employee-import',
                    content: wperp.template('erp-employee-import-csv')({}),
                    extraClass: 'medium',
                    
                    onReady: function() {
                        var modal  = this,
                            form   = '#erp-employee-import form.erp-modal-form';

                        $( '#erp-employee-csv-import-error' ).hide();
                        $( '#erp-employee-csv-import-error' ).html('');

                        $( form ).attr( 'enctype', 'multipart/form-data' );
                        $( form ).attr( 'id', 'import_form' );
                        
                        $( 'button#erp-employee-sample-csv' ).on( 'click', function(e) {
                            e.preventDefault();
                            var csvUrl = $(this).data('url');
                            window.location.href = csvUrl;
                        });

                        $('form#import_form #csv_file').on('change', function (e) {
                            e.preventDefault();
            
                            if (!this) {
                                return;
                            }

                            WeDevs_ERP_HR.employee.processCsvImporter(this);
                        });
                    },

                    onSubmit: function(modal) {
                        $( 'button[type=submit]', '.erp-modal' ).attr( 'disabled', 'disabled' );
                        $( '#erp-employee-csv-import-error' ).hide();
                        $( '#erp-employee-csv-import-error' ).html('');

                        var data = new FormData(this.get(0));
                                
                        wp.ajax.send({
                            data: data,
                            processData: false,
                            contentType: false,
                            success: function(response) {
                                modal.enableButton();
                                modal.closeModal();
                                WeDevs_ERP_HR.employee.reload();
                                swal('', response, 'success');
                            },
                            error: function(error) {
                                modal.enableButton();
                                $('.erp-modal-backdrop, .erp-modal' ).find( '.erp-loader' ).addClass( 'erp-hide' );
                                // swal('', error, 'error');
                                $( '#erp-employee-csv-import-error' ).show();
                                $( '#erp-employee-csv-import-error' ).html(error);
                            }
                        });
                    }
                });
            },

            /**
             * Export employee into CSV
             * 
             * @param {event} e
             */
            exportCsv: function(e) {
                if ( typeof e !== 'undefined' ) {
                    e.preventDefault();
                }

                var self = $(this);

                $.erpPopup({
                    title: self.data('title'),
                    button: self.data('btn'),
                    id: 'erp-employee-export',
                    content: wperp.template('erp-employee-export-csv')({}),
                    extraClass: '',
                    
                    onReady: function() {
                        var modal  = this,
                            form   = '#erp-employee-export form.erp-modal-form',
                            type   = 'employee',
                            fields = wpErpHr.erp_fields[type] ? wpErpHr.erp_fields[type].fields : [],
                            html   = '';

                        $( form ).attr( 'id', 'export_form' );
                                
                        for (var i = 0; i < fields.length; i++) {
                            html += '<div class="col-1"><label><input type="checkbox" name="fields[]" value="' + fields[i] + '"> ' + WeDevs_ERP_HR.employee.strTitleCase(fields[i]) + '</label></div>';
                        }
                
                        if (html) {
                            $('form#export_form #fields').html(html);
                        }

                        $("#export_form #selecctall").change(function (e) {
                            e.preventDefault();
            
                            $("#export_form #fields input[type=checkbox]").prop('checked', $(this).prop("checked"));
                        });
                    },

                    onSubmit: function(modal) {
                        this.unbind('submit');
                        this.get(0).submit();
                        modal.closeModal();
                    }
                });
            },

            /**
             * Processes csv importer
             * 
             * @param {String} fileSelector 
             */
            processCsvImporter: function(fileSelector) {
                $('#erp-csv-fields-container').show();

                var fieldsHtml     = '',
                    type           = 'employee',
                    required       = '',
                    reqSpan        = '',
                    fields         = wpErpHr.erp_fields[type] ? wpErpHr.erp_fields[type].fields : [],
                    requiredFields = wpErpHr.erp_fields[type] ? wpErpHr.erp_fields[type].required_fields : [];

                for (var i = 0; i < fields.length; i++) {

                    if (requiredFields.indexOf(fields[i]) !== -1) {
                        required = 'required';
                        reqSpan  = ' <span class="required">*</span>';
                    } else {
                        required = '';
                        reqSpan  = '';
                    }

                    fieldsHtml += '<tr>'
                                    + '<th>'
                                        + '<label for="fields[' + fields[i] + ']" class="csv_field_labels">' + WeDevs_ERP_HR.employee.strTitleCase(fields[i]) + reqSpan + '</label>'
                                    + '</th>'
                                    + '<td>'
                                        + '<select name="fields[' + fields[i] + ']" class="csv_fields" ' + required + '></select>'
                                    + '</td>'
                                + '</tr>';
                }

                $('#erp-csv-fields-container').html(fieldsHtml);

                WeDevs_ERP_HR.employee.mapCsvFields(fileSelector, '.csv_fields');
            },

            /**
             * Maps csv fields as required
             * 
             * @param {String} fileSelector 
             * @param {String} fieldSelector 
             */
            mapCsvFields: function(fileSelector, fieldSelector) {
                var file      = fileSelector.files[0],
                    reader    = new FileReader(),
                    first5000 = file.slice(0, 5000);
                
                    reader.readAsText(first5000);

                reader.onload = function (e) {
                    var csv             = reader.result,
                        lines           = csv.split('\n'),
                        columnNamesLine = lines[0],
                        columnNames     = columnNamesLine.split(','),
                        html            = '';

                    html += '<option value="">&mdash; Select Field &mdash;</option>';
                    
                    columnNames.forEach(function (item, index) {
                        item = item.replace(/"/g, "");

                        html += '<option value="' + index + '">' + item + '</option>';
                    });

                    if (html) {
                        $(fieldSelector).html(html);

                        $(fieldSelector).each(function () {
                            var fieldLabel = $(this).parent().parent().find('label').text(),
                                options    = $(this).find('option');

                            var targetOption = $(options).filter(function () {
                                var optionText = $(this).html(),
                                    regEx      = new RegExp(fieldLabel, 'i');

                                return regEx.test(optionText);
                            });

                            if (targetOption) {
                                $(options).removeAttr("selected");
                                $(this).val($(targetOption).val());
                            }
                        });
                    }
                };
            },

            /**
             * Converts slug into title
             * 
             * @param {String} string 
             * @returns String
             */
            strTitleCase: function(string) {
                var str = string.replace(/_/g, ' ');

                return str.toLowerCase().split(' ').map(function (word) {
                    return (word.charAt(0).toUpperCase() + word.slice(1));
                }).join(' ');
            },

            /**
             * Create a new employee modal
             *
             * @param  {event}
             */
            create: function(e) {
                if ( typeof e !== 'undefined' ) {
                    e.preventDefault();
                }

                if ( typeof wpErpHr.employee_empty === 'undefined' ) {
                    return;
                }

                $.erpPopup({
                    title: wpErpHr.popup.employee_title,
                    button: wpErpHr.popup.employee_create,
                    id: "erp-new-employee-popup",
                    content: wperp.template('erp-new-employee')( wpErpHr.employee_empty ).trim(),

                    onReady: function() {
                        WeDevs_ERP_HR.initDateField();
                        $('.select2').select2();
                        WeDevs_ERP_HR.employee.select2Action('erp-hrm-select2');
                        WeDevs_ERP_HR.employee.select2AddMoreContent();

                        $( '#user_notification').on('click', function() {
                            if ( $(this).is(':checked') ) {
                                $('.show-if-notification').show();
                            } else {
                                $('.show-if-notification').hide();
                            }
                        });

                        $( '#advanced_fields' ).click( function() {
                            if ( $( this ).is(' :checked ')) {
                                $( '.employee-work' ).show();
                                $( '.employee-personal' ).show();
                            } else {
                                $( '.employee-work' ).hide();
                                $( '.employee-personal' ).hide();
                            }
                        } );

                        $( 'button[type=submit]' ).click( WeDevs_ERP_HR.requiredAlert );
                    },

                    /**
                     * Handle the onsubmit function
                     *
                     * @param  {modal}
                     */
                    onSubmit: function(modal) {
                        $( 'button[type=submit]', '.erp-modal' ).attr( 'disabled', 'disabled' );

                        wp.ajax.send( 'erp-hr-employee-new', {
                            data: this.serialize(),
                            success: function(response) {

                                modal.enableButton();
                                modal.closeModal();
                                if( response.url !== undefined ){
                                    window.location.href = response.url;
                                }
                            },
                            error: function(error) {
                                modal.enableButton();
                                modal.showError(error);
                            }
                        });
                    },
                });
            },

            /**
             * select2 with add more button content
             *
             * @return  {void}
             */
            select2AddMoreContent: function() {
                var selects = $('.erp-hrm-select2-add-more');
                $.each( selects, function( key, element ) {
                    WeDevs_ERP_HR.employee.select2AddMoreActive(element);
                });
            },

            /**
             * select2 with add more button active
             *
             * @return  {void}
             */
            select2AddMoreActive: function(element) {
                var id = $(element).data('id');
                var addText = $(element).data('add');

                if ( typeof addText !== 'undefined' && addText.length > 0 ) {
                    $(element).select2().on('select2:open', function() {
                        $(".select2-results:not(:has(a))")
                        .append(
                            '<div class="erp-select2-add">'+
                            '<a href="#" id="'+id+'">'+addText+'</a>'+
                            '</div>'
                        );
                    });;
                } else {
                    $(element).select2({
                        width: 'element',
                        "language": {
                            noResults: function(){
                                return '<a href="#" class="button button-primary" id="'+id+'">Add New</a>';
                            }
                        },
                        escapeMarkup: function (markup) {
                            return markup;
                        }

                    });
                }
            },

            /**
             * select2 action
             *
             * @return  {void}
             */
            select2Action: function(element) {
                $('.'+element).select2({
                    width: 'element',
                });
            },

            /**
             * Edit an employee
             *
             * @param  {event}
             */
            edit: function(e) {
                e.preventDefault();

                var self = $(this);

                $.erpPopup({
                    title: wpErpHr.popup.employee_update,
                    button: wpErpHr.popup.employee_update,
                    id: 'erp-employee-edit',
                    onReady: function() {
                        var modal = this;

                        $( 'header', modal).after( $('<div class="loader"></div>').show() );

                        wp.ajax.send( 'erp-hr-emp-get', {
                            data: {
                                id: self.data('id'),
                                _wpnonce: wpErpHr.nonce
                            },
                            success: function(response) {
                                var html = wp.template('erp-new-employee')( response );
                                $( '.content', modal ).html( html );
                                $( '.loader', modal).remove();

                                WeDevs_ERP_HR.initDateField();
                                $('.select2').select2();
                                WeDevs_ERP_HR.employee.select2Action('erp-hrm-select2');
                                WeDevs_ERP_HR.employee.select2AddMoreContent();

                                $( '#advanced_fields' ).click( function() {
                                    if ( $( this ).is(' :checked ')) {
                                        $( '.employee-work' ).show();
                                        $( '.employee-personal' ).show();
                                    } else {
                                        $( '.employee-work' ).hide();
                                        $( '.employee-personal' ).hide();
                                    }
                                } );

                                $( 'div[data-selected]', modal ).each(function() {
                                    var self            = $(this),
                                        unchecked       = 0,
                                        selected        = self.data('selected'),
                                        requiredCbItems = $("span.checkbox input[type=checkbox][required]");

                                    if ( selected !== '' ) {
                                        self.find( 'select' ).val( selected ).trigger('change');
                                        self.find("input[type=radio][value='"+selected+"']").prop("checked",true);
                                        $.each(self.find("input[type=checkbox]"), function(index, data) {
                                            if($.inArray($(data).val(), selected.split(',')) != -1) {
                                                $(data).prop('checked', true);
                                            } else {
                                                if($.inArray($(data), requiredCbItems)) {
                                                    unchecked++;
                                                }
                                            }
                                        });

                                        if(unchecked !== requiredCbItems.length) {
                                            $.each(self.find("span.checkbox input[type=checkbox][required]"), function(index, cb) {
                                                if($.inArray($(cb).val(), selected.split(',')) == -1) {
                                                    $(cb).removeAttr("required");
                                                }
                                            });
                                        }
                                    }
                                });

                                // disable current one
                                $('#work_reporting_to option[value="' + response.id + '"]', modal).attr( 'disabled', 'disabled' );
                            }
                        });

                        $( 'button[type=submit]' ).click( function() { WeDevs_ERP_HR.requiredAlert('edit'); });
                    },
                    onSubmit: function(modal) {
                        modal.disableButton();

                        wp.ajax.send( {
                            data: this.serialize(),
                            success: function(response) {
                                WeDevs_ERP_HR.employee.reload();
                                modal.enableButton();
                                modal.closeModal();
                            },
                            error: function(error) {
                                modal.enableButton();
                                modal.showError( error );
                            }
                        });
                    }
                });
            },

            /**
             * Remove an employee
             *
             * @param  {event}
             */
            remove: function(e) {
                e.preventDefault();

                var self = $(this);

                if ( confirm( wpErpHr.delConfirmEmployee ) ) {
                    wp.ajax.send( 'erp-hr-emp-delete', {
                        data: {
                            _wpnonce: wpErpHr.nonce,
                            id: self.data( 'id' ),
                            hard: self.data( 'hard' )
                        },
                        success: function() {
                            self.closest('tr').fadeOut( 'fast', function() {
                                $(this).remove();
                                WeDevs_ERP_HR.employee.reload();
                            });
                        },
                        error: function(response) {
                            alert( response );
                        }
                    });
                }
            },

            restore: function(e) {
                e.preventDefault();

                var self = $(this);

                if ( confirm( wpErpHr.restoreConfirmEmployee ) ) {
                    wp.ajax.send( 'erp-hr-emp-restore', {
                        data: {
                            _wpnonce: wpErpHr.nonce,
                            id: self.data( 'id' ),
                        },
                        success: function() {
                            self.closest('tr').fadeOut( 'fast', function() {
                                $(this).remove();
                                WeDevs_ERP_HR.employee.reload();
                            });
                        },
                        error: function(response) {
                            alert( response );
                        }
                    });
                }

            },

            toggleFilterDropdown: function() {
                document.getElementById( 'erp-dropdown-content' ).classList.toggle( 'show' );
            },

            general: {

                create: function(e) {
                    if ( typeof e !== 'undefined' ) {
                        e.preventDefault();
                    }

                    var self = $(this);

                    $.erpPopup({
                        title: self.data('title'),
                        content: wp.template( self.data('template' ) )( self.data('data') ),
                        extraClass: 'smaller',
                        id: 'erp-hr-new-general',
                        button: self.data('button'),
                        onReady: function() {
                            WeDevs_ERP_HR.initDateField();

                            $( '.row[data-selected]', this ).each(function() {
                                var self = $(this),
                                    selected = self.data('selected');

                                if ( selected !== '' ) {
                                    self.find( 'select' ).val( selected );
                                }

                                if( selected === 'percentage' ) {
                                    $(".education-form-wrap #scale").removeAttr( 'required' );
                                    $(".education-form-wrap #result_scale").fadeOut();
                                }
                            });
                        },
                        onSubmit: function(modal) {
                            wp.ajax.send( {
                                data: this.serializeObject(),
                                success: function() {
                                    WeDevs_ERP_HR.reloadPage();
                                    modal.closeModal();
                                },
                                error: function(error) {
                                    modal.enableButton();
                                    modal.showError( error );
                                }
                            });
                        }
                    });
                },

                remove: function(e) {
                    e.preventDefault();

                    var self = $(this);

                    if ( confirm( wpErpHr.confirm ) ) {
                        wp.ajax.send( self.data('action'), {
                            data: {
                                id: self.data('id'),
                                employee_id: self.data('employee_id'),
                                _wpnonce: wpErpHr.nonce
                            },
                            success: function() {
                                WeDevs_ERP_HR.reloadPage();
                            },
                            error: function(error) {
                                alert( error );
                            }
                        });
                    }
                },

                selectResultType: function(e) {
                    var selectedType = $(this).val();
                    if( selectedType === 'percentage' ) {
                        $(".education-form-wrap #result_area label").html("Result (%) <span class='required'>*</span>");
                        $(".education-form-wrap #gpa").attr("placeholder", "100");
                        $(".education-form-wrap #scale").removeAttr( 'required' );
                        $(".education-form-wrap #result_scale").fadeOut();
                    } else {
                        $(".education-form-wrap #result_area label").html("Result (Grade) <span class='required'>*</span>");
                        $(".education-form-wrap #gpa").attr("placeholder", "5.0");
                        $(".education-form-wrap #scale").attr( 'required', 'required' );
                        $(".education-form-wrap #result_scale").fadeIn();
                    }
                }
            },

            updateJobStatus: function(e) {
                if ( typeof e !== 'undefined' ) {
                    e.preventDefault();
                }

                var self   = $(this);
                var status = '';
                var type   = '';

                wp.ajax.send( {
                    data: {
                        id: $('#erp-empl-status').data('id'),
                        action: 'erp-hr-emp-get',
                        _wpnonce: wpErpHr.nonce
                    },
                    success: function(response) {
                        status = response.work.status;
                        type   = response.work.type;

                        $.erpPopup({
                            title: self.data('title'),
                            button: wpErpHr.popup.update_status,
                            id: 'erp-hr-update-job-status',
                            content: '',
                            extraClass: 'smaller',
                            onReady: function() {
                                response.date = wpErpHr.currentDate;

                                var html = wp.template( self.data('template') )(response);
                                $( '.content', this ).html( html );

                                $( '.row[data-selected]', this ).each(function() {
                                    var self = $(this),
                                        selected = self.data('selected');
        
                                    if ( selected !== '' ) {
                                        self.find( 'select' ).val( selected );
                                    }
                                });

                                WeDevs_ERP_HR.employee.select2Action('erp-hrm-select2');
                                WeDevs_ERP_HR.initDateField();
                            },
                            onSubmit: function(modal) {
                                var data = this.serializeObject();
        
                                if(data.status) {
                                    if(status == data.status) {
                                        modal.closeModal();
                                        swal('', wpErpHr.popup.already_selected, 'error' );
                                    } else if(data.status == 'terminated') {
                                        modal.closeModal();
                                        $.erpPopup({
                                            title: self.data('title'),
                                            button: wpErpHr.popup.terminate,
                                            id: 'erp-hr-employee-terminate',
                                            content: '',
                                            extraClass: 'smaller',
                                            onReady: function() {
                                                var html = wp.template( 'erp-employment-terminate' )(data);
                                                $( '.content', this ).html( html );
                                                WeDevs_ERP_HR.initDateField();
                                            },
                                            onSubmit: function(modal) {
                                                wp.ajax.send( {
                                                    data: this.serializeObject(),
                                                    success: function() {
                                                        WeDevs_ERP_HR.reloadPage();
                                                        modal.closeModal();
                                                    },
                                                    error: function(error) {
                                                        modal.enableButton();
                                                        modal.showError( error );
                                                    }
                                                });
                                            }
                                        });
                                    } else if (data.status == 'active') {
                                        modal.closeModal();
                                        $.erpPopup({
                                            title: wpErpHr.popup.employment_type,
                                            button: wpErpHr.popup.update_status,
                                            id: 'erp-hr-update-job-status',
                                            content: '',
                                            extraClass: 'smaller',
                                            onReady: function() {
                                                var html = wp.template('erp-employment-type')(data);
                                                $( '.content', this ).html( html );
                                                WeDevs_ERP_HR.initDateField();
                                            },
                                            onSubmit: function(modal) {
                                                wp.ajax.send( {
                                                    data: this.serializeObject(),
                                                    success: function() {
                                                        WeDevs_ERP_HR.ajaxReq(data, modal);
                                                    },
                                                    error: function(error) {
                                                        modal.enableButton();
                                                        modal.showError( error );
                                                    }
                                                });
                                            }
                                        });
                                    } else {
                                        WeDevs_ERP_HR.ajaxReq(data, modal);
                                    }
                                } else if ( data.type ) {
                                    if (type == data.type) {
                                        modal.closeModal();
                                        swal('', wpErpHr.popup.already_selected, 'error' );
                                    } else {
                                        WeDevs_ERP_HR.ajaxReq(data, modal);
                                    }
                                } else {
                                    WeDevs_ERP_HR.ajaxReq(data, modal);
                                }
                            }
                        });
                    }
                });
            },

            removeHistory: function(e) {
                e.preventDefault();

                if ( confirm( wpErpHr.confirm ) ) {
                    wp.ajax.send( 'erp-hr-emp-delete-history', {
                        data: {
                            history_id: $(this).data('id'),
                            user_id: wpErpCurrentEmployee.user_id,
                            _wpnonce: wpErpHr.nonce
                        },
                        success: function() {
                            WeDevs_ERP_HR.reloadPage();
                        }
                    });
                }
            },

            editHistory: function(e) {
                if ( typeof e !== 'undefined' ) {
                    e.preventDefault();
                }

                var self     = $(this),
                    id       = self.data('id'),
                    title    = self.data('title'),
                    template = self.data('template');

                wp.ajax.send({
                    data: {
                        history_id: id,
                        action: 'erp_hr_employee_get_job_history',
                        _wpnonce: wpErpHr.nonce
                    },
                    success: function(response) {
                        $.erpPopup({
                            title: title,
                            button: wpErpHr.popup.update_status,
                            id: 'erp-hr-update-job-history',
                            content: '',
                            extraClass: 'smaller',
                            onReady: function() {
                                $( '.content', this ).html( wp.template(template)(response) );
                                WeDevs_ERP_HR.initDateField();

                                $( '.row[data-selected]', this ).each(function() {
                                    var self = $(this),
                                        selected = self.data('selected');
        
                                    if ( selected !== '' ) {
                                        self.find( 'select' ).val( selected );
                                    }
                                });

                                WeDevs_ERP_HR.employee.select2Action('erp-hrm-select2');
                            },
                            onSubmit: function(modal) {
                                wp.ajax.send( {
                                    data: this.serializeObject(),
                                    success: function(response) {
                                        WeDevs_ERP_HR.reloadPage();
                                        modal.enableButton();
                                        modal.closeModal();
                                        
                                        swal({
                                            title: '',
                                            text: response,
                                            type: 'success',
                                            timer: 2200,
                                            showConfirmButton: false
                                        });
                                    },
                                    error: function(error) {
                                        modal.enableButton();
                                        swal('', error , 'error');
                                    }
                                });
                            }
                        });
                    }
                });
            },

            printData: function(e) {
                e.preventDefault();
                window.print();
            },

            checkUserEmail: function() {
                var self = $(this),
                    val = self.val(),
                    id = self.closest('form').find('#erp-employee-id').val();

                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                if ( val == '' || !re.test( val ) ) {
                    return false;
                }

                if ( id != '0' ) {
                    return false;
                }

                wp.ajax.send( 'erp_hr_check_user_exist', {
                    data: {
                        email: val,
                        _wpnonce: wpErpHr.nonce
                    },
                    success: function() {
                        var form = self.closest('form');
                        form.find('.modal-suggession').fadeOut( 300, function() {
                            $(this).remove();
                        });
                        form.find('button[type=submit]' ).removeAttr( 'disabled' );
                    },
                    error: function( response ) {
                        var form = self.closest('form');
                        form.find('button[type=submit]' ).attr( 'disabled', 'disabled');

                        if ( response.type == 'employee' ) {
                            form.find('.modal-suggession').remove();
                            form.find('header.modal-header').append('<div class="modal-suggession">' + wpErpHr.employee_exit + '</div>');
                        }

                        if ( response.type == 'wp_user' ) {
                            form.find('.modal-suggession').remove();
                            form.find('header.modal-header').append('<div class="modal-suggession">'+ wpErpHr.make_employee_text +' <a href="#" id="erp-hr-create-wp-user-to-employee" data-user_id="'+ response.data.ID +'">' + wpErpHr.create_employee_text + '</a></div>' );
                        }

                        $('.modal-suggession').hide().slideDown( function() {
                            form.find('.content-container').css({ 'marginTop': '15px' });
                        });
                    }
                });
            },

            makeUserEmployee: function(e) {
                e.preventDefault();
                var self = $(this),
                    user_id = self.data('user_id');

                self.closest('.modal-suggession').append('<div class="erp-loader" style="top:9px; right:10px;"></div>');

                wp.ajax.send( 'erp-hr-convert-wp-to-employee', {
                    data: {
                        user_id: user_id,
                        _wpnonce: wpErpHr.nonce
                    },
                    success: function() {
                        self.closest('.modal-suggession').find('.erp-loader').remove();
                        self.closest('.erp-modal').remove();
                        $('.erp-modal-backdrop').remove();
                        WeDevs_ERP_HR.employee.reload();

                        $.erpPopup({
                            title: wpErpHr.popup.employee_update,
                            button: wpErpHr.popup.employee_update,
                            id: 'erp-employee-edit',
                            onReady: function() {
                                var modal = this;

                                $( 'header', modal).after( $('<div class="loader"></div>').show() );

                                wp.ajax.send( 'erp-hr-emp-get', {
                                    data: {
                                        id: user_id,
                                        _wpnonce: wpErpHr.nonce
                                    },
                                    success: function(response) {
                                        var html = wp.template('erp-new-employee')( response );
                                        $( '.content', modal ).html( html );
                                        $( '.loader', modal).remove();

                                        WeDevs_ERP_HR.initDateField();

                                        $( 'div[data-selected]', modal ).each(function() {
                                            var self = $(this),
                                                selected = self.data('selected');

                                            if ( selected !== '' ) {
                                                self.find( 'select' ).val( selected ).trigger('change');
                                            }
                                        });

                                        // disable current one
                                        $('#work_reporting_to option[value="' + response.id + '"]', modal).attr( 'disabled', 'disabled' );
                                    }
                                });
                            },
                            onSubmit: function(modal) {
                                modal.disableButton();

                                wp.ajax.send( {
                                    data: this.serialize(),
                                    success: function(response) {
                                        WeDevs_ERP_HR.employee.reload();
                                        modal.enableButton();
                                        modal.closeModal();
                                    },
                                    error: function(error) {
                                        modal.enableButton();
                                        modal.showError( error );
                                    }
                                });
                            }
                        });

                    },
                    error: function( response ) {
                        alert(response);
                    }
                });
            },

            addNote: function(e) {
                e.preventDefault();

                var form = $(this),
                    submit = form.find( 'input[type=submit]');

                submit.attr('disabled', 'disabled');
                form.find('.erp-note-loader').show();

                wp.ajax.send({
                    data: form.serializeObject(),
                    success: function() {
                        $.get( window.location.href, function( data ) {
                            if( $('ul.notes-list li').length < 0 ) {
                                $('ul.notes-list').prepend( $(data).find( 'ul.notes-list' ).after() );
                            }else {
                                $('ul.notes-list').prepend( $(data).find( 'ul.notes-list li' ).first() );
                            }

                            if( $('ul.notes-list li').length > 10 ){
                                $('ul.notes-list li').last().remove();
                            }
                            WeDevs_ERP_HR.employee.showLoadMoreBtn() ;
                            form.find('.erp-note-loader').hide();
                            form.find('textarea').val('');
                            submit.removeAttr( 'disabled' );
                        });

                    },
                    error: function() {
                        submit.removeAttr('disabled');
                        form.find('.erp-note-loader').hide();
                    }
                });
            },

            showLoadMoreBtn: function() {
                if( $('ul.notes-list li').length >= 10 ){
                    $('.wperp-load-more-btn').show();
                }else {
                    $('.wperp-load-more-btn').hide();
                }
            },

            loadNotes: function(e) {
                e.preventDefault();

                var self = $(this),
                    data = {
                        action : 'erp-load-more-notes',
                        user_id : self.data('user_id'),
                        total_no : self.data('total_no'),
                        offset_no : self.data('offset_no')
                    };

                var spiner = '<span class="erp-loader" style="margin:4px 0px 0px 10px"></span>';

                self.closest('p')
                    .append( spiner )
                    .find('.erp-loader')
                    .show();

                self.attr( 'disabled', true );

                wp.ajax.send({
                    data: data,
                    success: function( resp ) {
                        self.data( 'offset_no', parseInt(data.total_no)+parseInt(data.offset_no) );
                        $(resp.content).appendTo(self.closest('.note-tab-wrap').find('ul.notes-list')).hide().fadeIn();
                        self.removeAttr( 'disabled' );
                        $('.erp-loader').remove();
                    },
                    error: function( error ) {
                        alert(error);
                    }
                });
            },

            deleteNote: function(e) {
                e.preventDefault();

                if ( confirm( wpErpHr.delConfirmEmployeeNote ) ) {
                    var self = $(this),
                        data = {
                            action: 'erp-delete-employee-note',
                            note_id: self.data('note_id'),
                            user_id: wpErpCurrentEmployee.user_id,
                            _wpnonce : wpErpHr.nonce
                        };

                    wp.ajax.send({
                        data: data,
                        success: function( resp ) {
                            self.closest('li').fadeOut( 400, function() {
                                $(this).remove();
                                WeDevs_ERP_HR.employee.showLoadMoreBtn() ;
                            });
                        },
                        error: function( error ) {
                            alert(error);
                        }
                    });
                }
            },

            updatePerformance: function(e) {

                if ( typeof e !== 'undefined' ) {
                    e.preventDefault();
                }

                var self = $(this);

                $.erpPopup({
                    title: self.data('title'),
                    button: wpErpHr.popup.update_status,
                    id: 'erp-hr-update-performance',
                    content: '',
                    extraClass: 'smaller',
                    onReady: function() {
                        var html = wp.template( self.data('template') )(window.wpErpCurrentEmployee);
                        $( '.content', this ).html( html );
                        WeDevs_ERP_HR.initDateField();
                        WeDevs_ERP_HR.employee.select2Action('erp-hrm-select2');

                        $( '.row[data-selected]', this ).each(function() {
                            var self = $(this),
                                selected = self.data('selected');

                            if ( selected !== '' ) {
                                self.find( 'select' ).val( selected );
                            }
                        });
                    },
                    onSubmit: function(modal) {
                        wp.ajax.send( {
                            data: this.serializeObject(),
                            success: function() {
                                WeDevs_ERP_HR.reloadPage();
                                modal.closeModal();
                            },
                            error: function(error) {
                                modal.enableButton();
                                modal.showError( error );
                            }
                        });
                    }
                });
            },

            removePerformance: function(e) {
                e.preventDefault();

                if ( confirm( wpErpHr.confirm ) ) {
                    wp.ajax.send({
                        data: {
                            action: 'erp-hr-emp-delete-performance',
                            id: $(this).data('id'),
                            user_id: $(this).data('userid'),
                            _wpnonce: wpErpHr.nonce
                        },
                        success: function() {
                            WeDevs_ERP_HR.reloadPage();
                        }
                    });
                }
            },

            terminateEmployee: function(e) {

                if ( typeof e !== 'undefined' ) {
                    e.preventDefault();
                }

                var self           = $(this),
                    terminateData  = self.data('data') ? self.data('data') : window.wpErpCurrentEmployee;

                terminateData.date = wpErpHr.currentDate;

                $.erpPopup({
                    title: self.data('title'),
                    button: wpErpHr.popup.terminate,
                    id: 'erp-hr-employee-terminate',
                    content: '',
                    extraClass: 'smaller',
                    onReady: function() {
                        var html = wp.template( self.data('template') )( terminateData );
                        $( '.content', this ).html( html );
                        WeDevs_ERP_HR.initDateField();

                        $( '.row[data-selected]', this ).each(function() {
                            var self = $(this),
                                selected = self.data('selected');

                            if ( selected !== '' ) {
                                self.find( 'select' ).val( selected );
                            }
                        });

                        WeDevs_ERP_HR.employee.select2Action('erp-hrm-select2');
                    },
                    onSubmit: function(modal) {
                        wp.ajax.send( {
                            data: this.serializeObject(),
                            success: function() {
                                WeDevs_ERP_HR.reloadPage();
                                modal.closeModal();
                            },
                            error: function(error) {
                                modal.enableButton();
                                modal.showError( error );
                            }
                        });
                    }
                });

            },

            activateEmployee: function(e) {
                e.preventDefault();

                if ( confirm( wpErpHr.confirm ) ) {
                    wp.ajax.send({
                        data: {
                            action: 'erp-hr-emp-activate',
                            id: $(this).data('id'),
                            _wpnonce: wpErpHr.nonce
                        },
                        success: function() {
                            WeDevs_ERP_HR.reloadPage();
                        }
                    });
                }
            },

            changeEmployeeStatus: function(e) {
                e.preventDefault();

                var self = $(this),
                    form = self.closest('form'),
                    selectField = form.find( 'select#erp-hr-employee-status-option' ),
                    optionVal = selectField.val(),
                    selected = selectField.attr('data-selected');


                if ( 'terminated' == optionVal  ) {
                    if ( optionVal != selected ) {
                        $.erpPopup({
                            title: self.data('title'),
                            button: wpErpHr.popup.terminate,
                            id: 'erp-hr-employee-terminate',
                            content: '',
                            extraClass: 'smaller',
                            onReady: function() {
                                var html = wp.template( 'erp-employment-terminate' )({});
                                $( '.content', this ).html( html );
                                WeDevs_ERP_HR.initDateField();

                                WeDevs_ERP_HR.employee.select2Action('erp-hrm-select2');
                            },
                            onSubmit: function(modal) {
                                wp.ajax.send( {
                                    data: this.serializeObject(),
                                    success: function() {
                                        WeDevs_ERP_HR.reloadPage();
                                        modal.closeModal();
                                    },
                                    error: function(error) {
                                        modal.enableButton();
                                        modal.showError( error );
                                    }
                                });
                            }
                        });
                    } else {
                        alert( wpErpHr.popup.already_terminate );
                    }
                } else if ( 'active' == optionVal ) {
                    if ( optionVal != selected ) {
                        var self = $(this);
                        $.erpPopup({
                            title: wpErpHr.popup.employment_status,
                            button: wpErpHr.popup.update_status,
                            id: 'erp-hr-update-job-status',
                            content: '',
                            extraClass: 'smaller',
                            onReady: function() {
                                var html = wp.template('erp-employment-type')(window.wpErpCurrentEmployee);
                                $( '.content', this ).html( html );
                                WeDevs_ERP_HR.initDateField();
                            },
                            onSubmit: function(modal) {
                                wp.ajax.send( {
                                    data: this.serializeObject(),
                                    success: function() {
                                        modal.closeModal();
                                        form.submit();
                                    },
                                    error: function(error) {
                                        modal.enableButton();
                                        modal.showError( error );
                                    }
                                });
                            }
                        });
                    } else {
                        alert( wpErpHr.popup.already_active );
                    }

                } else {
                    form.submit();
                }
            }

        }
    };

    $(function() {
        WeDevs_ERP_HR.initialize();
    });
})(jQuery);
