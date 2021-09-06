<?php

require_once('TCPDF/tcpdf.php');

if(isset($_GET['sid']))
{
    session_start();
    if(session_id() == $_GET['sid'])
    {
        if(isset($_SESSION['time']))
        {
            if((time() - $_SESSION['time']) > 900)
            {
                session_unset();
                session_destroy();
            }
            else
            {
                class PDF extends TCPDF
                {
                    public function Header()
                    {
                        // Expediteur


                    }
                }

                $pdf = new PDF();

                $pdf->AddPage();

                $pdf->Output();
            }
        }
    }
}