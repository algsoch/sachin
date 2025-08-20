<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get POST data
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON data']);
    exit;
}

$name = $input['name'] ?? '';
$email = $input['email'] ?? '';
$budget = $input['budget'] ?? 'Not specified';
$message = $input['message'] ?? '';

// Validate required fields
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

// Gmail SMTP Configuration
// You need to set these values with your Gmail credentials
$smtp_host = 'smtp.gmail.com';
$smtp_port = 587;
$smtp_username = 'YOUR_GMAIL_ADDRESS@gmail.com'; // Replace with your Gmail
$smtp_password = 'YOUR_APP_PASSWORD'; // Replace with your Gmail App Password

// Email recipients
$to_primary = 'connectwithsachin06@gmail.com';
$to_cc = 'npdimagine@gmail.com';

// Create email content
$subject = "🎬 New Project Inquiry from $name - edited.frame";

$email_body = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #667eea; }
        .value { margin-top: 5px; }
        .footer { background: #333; color: white; padding: 15px; text-align: center; font-size: 12px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>🎬 New Project Inquiry</h1>
            <p>edited.frame - Video Editing Services</p>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>👤 Client Name:</div>
                <div class='value'>$name</div>
            </div>
            <div class='field'>
                <div class='label'>📧 Email Address:</div>
                <div class='value'>$email</div>
            </div>
            <div class='field'>
                <div class='label'>💰 Project Budget:</div>
                <div class='value'>$budget</div>
            </div>
            <div class='field'>
                <div class='label'>📝 Project Details:</div>
                <div class='value'>" . nl2br(htmlspecialchars($message)) . "</div>
            </div>
        </div>
        <div class='footer'>
            <p>This inquiry was submitted through edited.frame website</p>
            <p>Timestamp: " . date('Y-m-d H:i:s T') . "</p>
        </div>
    </div>
</body>
</html>
";

// Email headers
$headers = array();
$headers[] = "From: edited.frame Contact Form <$smtp_username>";
$headers[] = "Reply-To: $email";
$headers[] = "CC: $to_cc";
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-Type: text/html; charset=UTF-8";
$headers[] = "X-Mailer: PHP/" . phpversion();

try {
    // Send email using PHP's mail() function
    $mail_sent = mail($to_primary, $subject, $email_body, implode("\r\n", $headers));
    
    if ($mail_sent) {
        // Send Discord notification
        $discord_webhook = 'https://discord.com/api/webhooks/1407102230620016660/PktP90bwhlLKelQ5wwScuke9qmYjuKoVLjxFAVcR0dBGheqdUyXmTXwBazVB70GVtffL';
        
        $discord_embed = array(
            'title' => '🎬 New Project Inquiry - edited.frame',
            'color' => 8067042,
            'fields' => array(
                array('name' => '👤 Client Name', 'value' => $name, 'inline' => true),
                array('name' => '📧 Client Email', 'value' => $email, 'inline' => true),
                array('name' => '💰 Budget', 'value' => $budget, 'inline' => true),
                array('name' => '📝 Project Details', 'value' => strlen($message) > 1000 ? substr($message, 0, 1000) . '...' : $message)
            ),
            'footer' => array('text' => '📧 Emails sent to: connectwithsachin06@gmail.com & npdimagine@gmail.com'),
            'timestamp' => date('c')
        );
        
        $discord_data = array(
            'content' => '🚨 **New Project Inquiry Received!** 🚨',
            'embeds' => array($discord_embed)
        );
        
        // Send Discord webhook
        $ch = curl_init($discord_webhook);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-type: application/json'));
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($discord_data));
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_exec($ch);
        curl_close($ch);
        
        echo json_encode([
            'success' => true, 
            'message' => 'Thank you! Your project inquiry has been sent successfully. I\'ll get back to you within 24 hours with a custom quote.'
        ]);
    } else {
        throw new Exception('Failed to send email');
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Failed to send email. Please try again or contact directly at connectwithsachin06@gmail.com'
    ]);
}
?>
