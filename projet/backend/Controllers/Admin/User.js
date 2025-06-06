// controllers/userController.js
const db = require('../../config/bd'); // Assurez-vous que ce chemin est correct
const bcrypt = require('bcryptjs');

const checkUserExists = async (userNumber) => {
    const [rows] = await db.query('SELECT * FROM vicidial_users WHERE user= ?', [userNumber]);
    return rows.length > 0;
};

const insertUser = async (newUser) => {
    await db.query('INSERT INTO vicidial_users SET ?', newUser);
};


exports.getUsersGroups = async(req, res) => {
    try{
        const [rows] = await db.query('SELECT user_group FROM vicidial_user_groups');
        res.status(200).json(rows); // Return the list of user groups
    } catch (error) {
        console.error('Error fetching user groups:', error);
        res.status(500).json({ message: 'An error occurred while fetching user groups.' });
    
    }
};
// create new user 

exports.createUser = async (req, res) => {
    const {
        user,
        pass,
        full_name,
        user_level,
        user_group
    } = req.body;

    // Validation des champs obligatoires
    if (!user || !pass || !full_name) {
        return res.status(400).json({ message: 'User Number, Password, and Full Name are required.' });
    }

    try {
        // Vérification de l'existence de l'utilisateur
        const userExists = await checkUserExists(user);
        if (userExists) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Hashage du mot de passe
        // const hashedPassword = await bcrypt.hash(pass, 10);

        // Création de l'utilisateur avec les valeurs par défaut pour les autres champs
        const newUser = {
            user: user,
            pass: pass,
            full_name: full_name,
            user_level: user_level || 1, // Default to 1 if not provided
            user_group: user_group || null, // Default to NULL if not provided
            active: 'Y', // Default active status
            delete_users: '0',
            delete_user_groups: '0',
            delete_lists: '0',
            delete_campaigns: '0',
            delete_ingroups: '0',
            delete_remote_agents: '0',
            load_leads: '0',
            campaign_detail: '0',
            ast_admin_access: '0',
            ast_delete_phones: '0',
            delete_scripts: '0',
            modify_leads: '0',
            hotkeys_active: '0',
            change_agent_campaign: '0',
            agent_choose_ingroups: '1',
            closer_campaigns: null,
            scheduled_callbacks: '1',
            agentonly_callbacks: '0',
            agentcall_manual: '0',
            vicidial_recording: '1',
            vicidial_transfers: '1',
            delete_filters: '0',
            alter_agent_interface_options: '0',
            closer_default_blended: '0',
            delete_call_times: '0',
            modify_call_times: '0',
            modify_users: '0',
            modify_campaigns: '0',
            modify_lists: '0',
            modify_scripts: '0',
            modify_filters: '0',
            modify_ingroups: '0',
            modify_usergroups: '0',
            modify_remoteagents: '0',
            modify_servers: '0',
            view_reports: '0',
            vicidial_recording_override: 'DISABLED',
            alter_custdata_override: 'NOT_ACTIVE',
            qc_enabled: '0',
            qc_user_level: 1,
            qc_pass: '0',
            qc_finish: '0',
            qc_commit: '0',
            add_timeclock_log: '0',
            modify_timeclock_log: '0',
            delete_timeclock_log: '0',
            alter_custphone_override: 'NOT_ACTIVE',
            vdc_agent_api_access: '0',
            modify_inbound_dids: '0',
            delete_inbound_dids: '0',
            alert_enabled: '0',
            download_lists: '0',
            agent_shift_enforcement_override: 'DISABLED',
            manager_shift_enforcement_override: '0',
            shift_override_flag: '0',
            export_reports: '0',
            delete_from_dnc: '0',
            email: '',
            user_code: '',
            territory: '',
            allow_alerts: '0',
            agent_choose_territories: '1',
            custom_one: '',
            custom_two: '',
            custom_three: '',
            custom_four: '',
            custom_five: '',
            voicemail_id: null,
            agent_call_log_view_override: 'DISABLED',
            callcard_admin: '0',
            agent_choose_blended: '1',
            realtime_block_user_info: '0',
            custom_fields_modify: '0',
            force_change_password: 'N',
            agent_lead_search_override: 'NOT_ACTIVE',
            modify_shifts: '0',
            modify_phones: '0',
            modify_carriers: '0',
            modify_labels: '0',
            modify_statuses: '0',
            modify_voicemail: '0',
            modify_audiostore: '0',
            modify_moh: '0',
            modify_tts: '0',
            preset_contact_search: 'NOT_ACTIVE',
            modify_contacts: '0',
            modify_same_user_level: '1',
            admin_hide_lead_data: '0',
            admin_hide_phone_data: '0',
            agentcall_email: '0',
            modify_email_accounts: '0',
            failed_login_count: 0,
            last_login_date: '2001-01-01 00:00:01',
            last_ip: '',
            pass_hash: '',
            alter_admin_interface_options: '1',
            max_inbound_calls: 0,
            modify_custom_dialplans: '0',
            wrapup_seconds_override: -1,
            modify_languages: '0',
            selected_language: 'default English',
            user_choose_language: '0',
            ignore_group_on_search: '0',
            api_list_restrict: '0',
            api_allowed_functions: 'ALL_FUNCTIONS',
            lead_filter_id: 'NONE',
            admin_cf_show_hidden: '0',
            agentcall_chat: '0',
            user_hide_realtime: '0',
            access_recordings: '0',
            modify_colors: '0',
            user_nickname: '',
            user_new_lead_limit: -1,
            api_only_user: '0',
            modify_auto_reports: '0',
            modify_ip_lists: '0',
            ignore_ip_list: '0',
            ready_max_logout: -1,
            export_gdpr_leads: '0',
            pause_code_approval: '0',
            max_hopper_calls: 0,
            max_hopper_calls_hour: 0,
            mute_recordings: 'DISABLED',
            hide_call_log_info: 'DISABLED',
            next_dial_my_callbacks: 'NOT_ACTIVE',
            user_admin_redirect_url: null,
            max_inbound_filter_enabled: '0',
            max_inbound_filter_statuses: null,
            max_inbound_filter_ingroups: null,
            max_inbound_filter_min_sec: -1,
            status_group_id: '',
            mobile_number: '',
            two_factor_override: 'NOT_ACTIVE',
            manual_dial_filter: 'DISABLED',
            user_location: '',
            download_invalid_files: '0',
            user_group_two: '',
            failed_login_attempts_today: 0,
            failed_login_count_today: 0,
            failed_last_ip_today: '',
            failed_last_type_today: '',
            modify_dial_prefix: '0',
            inbound_credits: -1,
            hci_enabled: '0',
            modify_stamp: new Date().toISOString().slice(0, 19).replace('T', ' ')
        };

        // Insertion de l'utilisateur dans la table vicidial_users
        const query = `
            INSERT INTO vicidial_users SET ?
        `;
        await db.query(query, [newUser]);

        res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
        console.error('Error creating user:', error); // Log de l'erreur pour le développement
        res.status(500).json({ message: 'An error occurred, please try again later.' });
    }
};



exports.getUsers = async (req, res) => {
    try {
      const [users] = await db.query("SELECT * FROM vicidial_users");
      res.status(200).json(users);
    } catch (error) {
      console.error("Error retrieving users:", error);
      res
        .status(500)
        .json({ message: "An error occurred, please try again later." });
    }
  };



// Retrieve user by ID
exports.getUserById = async (req, res) => {
    const { userId } = req.params;

    try {
        const [user] = await db.query('SELECT * FROM vicidial_users WHERE user_id = ?', [userId]);
        
        
        if (user.length<1) {
            console.log('user not fouund');
            
            return res.status(404).json({ message: 'User not found.' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error retrieving user by ID:', error);
        res.status(500).json({ message: 'An error occurred, please try again later.' });
    }
};
// Update user by ID
exports.updateUser = async (req, res) => {
    const { userId } = req.params; // Extract user ID from the URL
    const updatedData = req.body; // Extract updated data from the request body
    console.log('User ID:', userId);
    console.log('Updated Data:', updatedData);
    
    // Validate if the user ID and updated data are provided
    if (!userId || !updatedData) {
        return res.status(400).json({ message: 'User ID and updated data are required.' });
    }

    try {
        // Check if the user exists
        const [user] = await db.query('SELECT * FROM vicidial_users WHERE user_id = ?', [userId]);
        if (user.length < 1) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // If no data to update, return an error
        if (Object.keys(updatedData).length === 0) {
            return res.status(400).json({ message: 'No data to update.' });
        }

        console.log('Updating with the following data:', updatedData);  // Debugging log

        // Update the user in the database
        const query = 'UPDATE vicidial_users SET ? WHERE user_id = ?';
        await db.query(query, [updatedData, userId]);

        res.status(200).json({ message: 'User updated successfully.' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'An error occurred, please try again later.' });
    }
};
exports.copyUser = async (req, res) => {
    const { userID, user, pass, full_name,mobile_number ,phone_login, phone_pass,user_group,user_code,email,user_nickname,voicemail_id,territory} = req.body;

    console.log("User ID:", userID); // This should log the correct value

    try {
        // Check if the original user exists
        const [existingUser] = await db.query('SELECT * FROM vicidial_users WHERE user_id = ?', [userID]);
        if (existingUser.length < 1) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Get the original user data
        const originalUser = existingUser[0];
phone_pass
        // Create a new user object
        const newUser = {
            user: user || originalUser.user, // Use user from request or original if not provideduser_group
            pass: pass || originalUser.pass, // Use pass from request or original if not provided
            full_name: full_name || originalUser.full_name, 
            mobile_number: mobile_number || originalUser.mobile_number,
             phone_login: phone_login || originalUser.phone_login,
             phone_pass: phone_pass || originalUser.phone_pass,
             user_group: user_group || originalUser.user_group,
             user_code: user_code || originalUser.user_code,
             email: email || originalUser.email,
             user_nickname: user_nickname || originalUser.user_nickname,
             voicemail_id: voicemail_id || originalUser.voicemail_id,
             territory: territory || originalUser.territory,


            // Use full_name from request or original if not provided
            // Copy necessary fields from the original user while excluding unique constraints
            // Use a spread operator to include other fields as needed
            modify_stamp: new Date().toISOString().slice(0, 19).replace('T', ' '), // Update timestamp
            // Exclude user_id and other unique fields to avoid duplication issues
            user_id: undefined, // Make sure to not copy user_id
        };

        console.log(newUser);

        // Check if the new user already exists
        const [duplicateUser] = await db.query('SELECT * FROM vicidial_users WHERE user = ?', [newUser.user]);
        if (duplicateUser.length > 0) {
            console.log(req.body.user);
            return res.status(400).json({ message: 'User already exists with this username.' });
        }

        // Insert the new user into the database
        const query = 'INSERT INTO vicidial_users SET ?';
        await db.query(query, [newUser]);
        res.status(201).json({ message: 'User copied successfully.' });

        // Log the copied user details for debugging purposes
        console.log('Copied user details:', newUser);
    } catch (error) {
        console.error('Error copying user:', error);
        res.status(500).json({ message: 'An error occurred, please try again later.' });
    }
};

exports.getUserStats = async (req, res) => {
    try {
        const { user } = req.params;
        
        if (!user) {
            return res.status(400).json({ message: 'User parameter is required' });
        }

        // Get all data from vicidial_log
        const [callData] = await db.query(
            `SELECT * 
            FROM vicidial_log 
            WHERE user = ?`,
            [user]
        );

        // Get all data from vicidial_closer_log
        const [closerData] = await db.query(
            `SELECT * 
            FROM vicidial_closer_log 
            WHERE user = ?`,
            [user]
        );

        // Get all data from vicidial_user_log
        const [userLogData] = await db.query(
            `SELECT * 
            FROM vicidial_user_log 
            WHERE user = ?`,
            [user]
        );

        // Get all data from vicidial_timeclock_log
        const [timeclockData] = await db.query(
            `SELECT * 
            FROM vicidial_timeclock_log 
            WHERE user = ?`,
            [user]
        );

        // Get all data from vicidial_user_closer_log
        const [userCloserData] = await db.query(
            `SELECT * 
            FROM vicidial_user_closer_log 
            WHERE user = ?`,
            [user]
        );

        // Get user info
        const [userInfo] = await db.query(
            `SELECT * 
            FROM vicidial_users 
            WHERE user = ?`,
            [user]
        );

        // Combine all data
        const data = {
            userInfo: userInfo[0],
            callData: callData,
            closerData: closerData,
            userLogData: userLogData,
            timeclockData: timeclockData,
            userCloserData: userCloserData
        };

        res.json(data);
    } catch (error) {
        console.error('Error retrieving user data:', error);
        res.status(500).json({ message: 'An error occurred while retrieving user data.' });
    }
};

// Get dashboard user statistics
exports.getDashboardUserStats = async (req, res) => {
    try {
        // Obtenir le nombre total d'utilisateurs
        const [totalUsers] = await db.query('SELECT COUNT(*) as total FROM vicidial_users');
        
        // Obtenir le nombre d'utilisateurs actifs
        const [activeUsers] = await db.query("SELECT COUNT(*) as active FROM vicidial_users WHERE active = 'Y'");
        
        // Obtenir le nombre d'utilisateurs par niveau
        const [usersByLevel] = await db.query(
            `SELECT user_level, 
                   CASE 
                     WHEN user_level = 1 THEN 'Agent'
                     WHEN user_level = 2 THEN 'Manager'
                     WHEN user_level = 3 THEN 'Supervisor'
                     WHEN user_level = 4 THEN 'Admin'
                     WHEN user_level = 9 THEN 'Super Admin'
                     ELSE CONCAT('Niveau ', user_level)
                   END as level_name,
                   COUNT(*) as count 
            FROM vicidial_users 
            GROUP BY user_level 
            ORDER BY user_level`
        );
        
        // Obtenir les utilisateurs récemment connectés
        const [recentLogins] = await db.query(
            `SELECT user, full_name, last_login_date, user_level,
                   CASE 
                     WHEN user_level = 1 THEN 'Agent'
                     WHEN user_level = 2 THEN 'Manager'
                     WHEN user_level = 3 THEN 'Supervisor'
                     WHEN user_level = 4 THEN 'Admin'
                     WHEN user_level = 9 THEN 'Super Admin'
                     ELSE CONCAT('Niveau ', user_level)
                   END as level_name
            FROM vicidial_users
            WHERE last_login_date IS NOT NULL 
            ORDER BY last_login_date DESC 
            LIMIT 5`
        );
        
        // Calculer le taux d'utilisateurs actifs
        const activeRate = totalUsers[0].total > 0 
            ? Math.round((activeUsers[0].active / totalUsers[0].total) * 100) 
            : 0;
        
        res.json({
            totalUsers: totalUsers[0].total,
            activeUsers: activeUsers[0].active,
            activeRate: activeRate,
            usersByLevel: usersByLevel,
            recentLogins: recentLogins
        });
    } catch (error) {
        console.error('Error retrieving dashboard user statistics:', error);
        res.status(500).json({ message: 'An error occurred while retrieving dashboard user statistics.' });
    }
};

// Get comprehensive user statistics
exports.getUserStatistics = async (req, res) => {
    try {
        const { user } = req.params;
        
        if (!user) {
            return res.status(400).json({ message: 'User parameter is required' });
        }

        // Get user info
        const [userInfo] = await db.query('SELECT * FROM vicidial_users WHERE user = ?', [user]);
        if (!userInfo.length) {
            return res.status(404).json({ message: 'User not found' });
        } 

        // Get call statistics from vicidial_log
        const [callStats] = await db.query(
            `SELECT 
                COUNT(*) as total_calls,
                SUM(CASE WHEN status IN ('SALE', 'CONFIRMED') THEN 1 ELSE 0 END) as successful_calls,
                AVG(length_in_sec) as avg_call_duration,
                MAX(length_in_sec) as longest_call,
                MIN(length_in_sec) as shortest_call
            FROM vicidial_log 
            WHERE user = ?`,
            [user]
        );

        // Get closer statistics
        const [closerStats] = await db.query(
            `SELECT 
                COUNT(*) as total_closer_calls,
                SUM(CASE WHEN status IN ('SALE', 'CONFIRMED') THEN 1 ELSE 0 END) as successful_closer_calls
            FROM vicidial_closer_log 
            WHERE user = ?`,
            [user]
        );

        // Get user log statistics
        const [userLogStats] = await db.query(
            `SELECT 
                COUNT(*) as total_user_log_entries,
                MIN(event_time) as first_login,
                MAX(event_time) as last_login
            FROM vicidial_user_log 
            WHERE user = ?`,
            [user]
        );

        // Get timeclock statistics
        const [timeclockStats] = await db.query(
            `SELECT 
                COUNT(*) as total_timeclock_entries,
                SUM(CASE WHEN event_type = 'LOGIN' THEN 1 ELSE 0 END) as total_logins,
                SUM(CASE WHEN event_type = 'LOGOUT' THEN 1 ELSE 0 END) as total_logouts
            FROM vicidial_timeclock_log 
            WHERE user = ?`,
            [user]
        );

        // Get user closer statistics
        const [userCloserStats] = await db.query(
            `SELECT 
                COUNT(*) as total_user_closer_entries,
                SUM(CASE WHEN status IN ('SALE', 'CONFIRMED') THEN 1 ELSE 0 END) as successful_closer_entries
            FROM vicidial_user_closer_log 
            WHERE user = ?`,
            [user]
        );

        // Combine all statistics
        const statistics = {
            userInfo: userInfo[0],
            callStats: callStats[0],
            closerStats: closerStats[0],
            userLogStats: userLogStats[0],
            timeclockStats: timeclockStats[0],
            userCloserStats: userCloserStats[0]
        };

        res.json(statistics);
    } catch (error) {
        console.error('Error retrieving user statistics:', error);
        res.status(500).json({ message: 'An error occurred while retrieving user statistics.' });
    }
};

// Get active users count and recent user activity
exports.getActiveUsersCount = async (req, res) => {
    try {
        // Get count of users by activity status
        const [usersByStatus] = await db.execute(
            `SELECT 
                SUM(CASE WHEN active = 'Y' THEN 1 ELSE 0 END) as active_users_count,
                SUM(CASE WHEN active = 'N' THEN 1 ELSE 0 END) as inactive_users_count,
                COUNT(*) as total_users_count
            FROM vicidial_users`
        );
        
        // Get count of users logged in today
        const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format
        const [loggedInTodayCount] = await db.execute(
            `SELECT COUNT(DISTINCT user) as logged_in_today 
            FROM vicidial_user_log 
            WHERE DATE(event_date) = ?`,
            [today]
        );
        
        // Get users currently logged in (last 30 minutes)
        const thirtyMinutesAgo = new Date();
        thirtyMinutesAgo.setMinutes(thirtyMinutesAgo.getMinutes() - 30);
        const thirtyMinutesAgoStr = thirtyMinutesAgo.toISOString().slice(0, 19).replace('T', ' ');
        
        const [currentlyLoggedIn] = await db.execute(
            `SELECT COUNT(DISTINCT user) as currently_logged_in
            FROM vicidial_user_log
            WHERE event_date > ? AND event = 'LOGIN'`,
            [thirtyMinutesAgoStr]
        );
        
        // Get recently active users (last 24 hours)
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().slice(0, 19).replace('T', ' ');
        
        const [recentlyActiveUsers] = await db.execute(
            `SELECT DISTINCT vul.user, vu.full_name, vu.active, MAX(vul.event_date) as last_activity
            FROM vicidial_user_log vul
            JOIN vicidial_users vu ON vul.user = vu.user
            WHERE vul.event_date > ?
            GROUP BY vul.user
            ORDER BY last_activity DESC
            LIMIT 5`,
            [yesterdayStr]
        );
        
        res.json({
            success: true,
            data: {
                activeUsersCount: parseInt(usersByStatus[0].active_users_count) || 0,
                inactiveUsersCount: parseInt(usersByStatus[0].inactive_users_count) || 0,
                totalUsersCount: parseInt(usersByStatus[0].total_users_count) || 0,
                loggedInTodayCount: parseInt(loggedInTodayCount[0].logged_in_today) || 0,
                currentlyLoggedIn: parseInt(currentlyLoggedIn[0].currently_logged_in) || 0,
                recentlyActiveUsers: recentlyActiveUsers.map(user => ({
                    ...user,
                    status: user.active === 'Y' ? 'Actif' : 'Inactif'
                }))
            }
        });
    } catch (error) {
        console.error('Error retrieving active users count:', error);
        res.status(500).json({
            success: false, 
            message: 'An error occurred while retrieving active users count',
            error: error.message
        });
    }
};
