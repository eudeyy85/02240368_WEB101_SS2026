'use client'; // Runs in the browser, not on the server

// useState = stores form data like the file and caption
import { useState } from 'react';

// useRouter = lets us redirect after successful upload
import { useRouter } from 'next/navigation';

// Link = for the back button to go back to feed
import Link from 'next/link';

// axios = for sending the video file to our backend
import axios from 'axios';

// useAuth = to get the logged-in user (we need their token)
import { useAuth } from '../../context/AuthContext';

export default function UploadPage() {
  // caption = text the user types as video description
  const [caption, setCaption] = useState('');

  // file = the actual video file the user selects
  const [file, setFile] = useState(null);

  // error = shows error message if upload fails
  const [error, setError] = useState('');

  // loading = true while uploading, disables button to prevent double upload
  const [loading, setLoading] = useState(false);

  // progress = 0 to 100, shows how much of the file has uploaded
  const [progress, setProgress] = useState(0);

  // preview = temporary URL to show a preview of selected video
  const [preview, setPreview] = useState(null);

  const { user } = useAuth();
  const router = useRouter();

  // Called when user selects a video file
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // save file to state

      // URL.createObjectURL makes a temporary local URL
      // so we can show a preview before uploading
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // Called when user clicks the Upload button
  const handleSubmit = async (e) => {
    e.preventDefault(); // stops page from reloading
    if (!file) return setError('Please select a video file.');

    setLoading(true);
    setError('');
    setProgress(0);

    // FormData is how we send files over HTTP
    // Normal JSON can't send binary files like videos
    const formData = new FormData();
    formData.append('video', file);       // attach the video file
    formData.append('caption', caption); // attach the caption text

    try {
      const token = localStorage.getItem('token');

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/videos`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', // tells backend we're sending a file
          },
          // onUploadProgress fires repeatedly as file uploads
          // e.loaded = bytes uploaded so far
          // e.total = total bytes to upload
          onUploadProgress: (e) => {
            setProgress(Math.round((e.loaded * 100) / e.total));
          },
        }
      );

      // Upload done! Go to feed page
      router.push('/feed');
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{minHeight:'100vh',background:'#f1f1f2'}}>

      {/* ===== NAVBAR ===== */}
      <nav style={{
        position:'fixed',top:0,width:'100%',
        background:'#fff',
        borderBottom:'1px solid #e3e3e4',
        zIndex:100,height:'60px',
        display:'flex',alignItems:'center',
        justifyContent:'space-between',
        padding:'0 24px'
      }}>
        {/* Logo */}
        <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
          <span style={{fontSize:'28px'}}>🎵</span>
          <span style={{fontSize:'22px',fontWeight:'800',background:'linear-gradient(90deg,#fe2c55,#25f4ee)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
            TikTok
          </span>
        </div>

        {/* Back to feed link */}
        <Link href="/feed" style={{
          color:'#161823',textDecoration:'none',
          fontSize:'15px',fontWeight:'500',
          display:'flex',alignItems:'center',gap:'4px'
        }}>
          ← Back to Feed
        </Link>
      </nav>

      {/* ===== MAIN CONTENT ===== */}
      <div style={{paddingTop:'80px',maxWidth:'900px',margin:'0 auto',padding:'80px 24px 40px'}}>
        <h1 style={{fontSize:'24px',fontWeight:'700',color:'#161823',marginBottom:'4px'}}>Upload Video</h1>
        <p style={{color:'#757575',marginBottom:'32px',fontSize:'15px'}}>Post a video to your account</p>

        {/* Two column layout: left = upload area, right = form */}
        <div style={{display:'flex',gap:'32px',alignItems:'flex-start'}}>

          {/* ===== LEFT: Video Upload / Preview Box ===== */}
          <div style={{
            width:'340px',flexShrink:0,
            border:'2px dashed #e3e3e4',
            borderRadius:'12px',
            background:'#fff',
            minHeight:'400px',
            display:'flex',flexDirection:'column',
            alignItems:'center',justifyContent:'center',
            overflow:'hidden',position:'relative'
          }}>
            {preview ? (
              // If user selected a video, show preview
              <video
                src={preview}
                controls
                style={{width:'100%',height:'400px',objectFit:'cover'}}
              />
            ) : (
              // Otherwise show upload instructions
              <div style={{textAlign:'center',padding:'40px 24px'}}>
                <div style={{fontSize:'56px',marginBottom:'16px'}}>📹</div>
                <p style={{fontWeight:'600',color:'#161823',marginBottom:'8px',fontSize:'16px'}}>
                  Select video to upload
                </p>
                <p style={{color:'#757575',fontSize:'13px',lineHeight:'1.6'}}>
                  MP4 or WebM<br/>
                  Up to 10 minutes<br/>
                  Less than 2 GB
                </p>

                {/* Hidden file input, triggered by the button below */}
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  id="fileInput"
                  style={{display:'none'}} // hidden, we use a custom button
                />
                <label htmlFor="fileInput" style={{
                  display:'inline-block',
                  marginTop:'20px',
                  padding:'10px 24px',
                  background:'#fe2c55',
                  color:'white',
                  borderRadius:'4px',
                  cursor:'pointer',
                  fontWeight:'600',fontSize:'15px'
                }}>
                  Select file
                </label>
              </div>
            )}
          </div>

          {/* ===== RIGHT: Caption + Submit Form ===== */}
          <div style={{flex:1,background:'#fff',borderRadius:'12px',padding:'32px'}}>

            {/* Error message box */}
            {error && (
              <div style={{background:'#fff0f3',border:'1px solid #fe2c55',color:'#fe2c55',padding:'12px 16px',borderRadius:'8px',marginBottom:'20px',fontSize:'14px'}}>
                {error}
              </div>
            )}

            {/* Show selected filename */}
            {file && (
              <div style={{background:'#f1f1f2',padding:'12px 16px',borderRadius:'8px',marginBottom:'20px',fontSize:'14px',color:'#161823'}}>
                📎 <strong>{file.name}</strong>
                <span style={{color:'#757575',marginLeft:'8px'}}>
                  ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  {/* converts bytes to MB: divide by 1024 twice */}
                </span>

                {/* Button to change the selected file */}
                <input type="file" accept="video/*" onChange={handleFileChange} id="changeFile" style={{display:'none'}}/>
                <label htmlFor="changeFile" style={{marginLeft:'12px',color:'#fe2c55',cursor:'pointer',fontSize:'13px',fontWeight:'500'}}>
                  Change
                </label>
              </div>
            )}

            {/* Caption textarea */}
            <div style={{marginBottom:'24px'}}>
              <label style={{display:'block',fontSize:'15px',fontWeight:'600',color:'#161823',marginBottom:'8px'}}>
                Caption
              </label>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Add a caption to your video..."
                rows={4}
                style={{
                  width:'100%',padding:'12px 16px',
                  border:'1px solid #e3e3e4',
                  borderRadius:'8px',fontSize:'15px',
                  outline:'none',resize:'vertical',
                  fontFamily:'inherit',background:'#f8f8f8',
                  color:'#161823'
                }}
                onFocus={e => e.target.style.border='1px solid #fe2c55'}
                onBlur={e => e.target.style.border='1px solid #e3e3e4'}
              />
            </div>

            {/* Upload progress bar - only shows while uploading */}
            {loading && (
              <div style={{marginBottom:'20px'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px'}}>
                  <span style={{fontSize:'14px',color:'#757575'}}>Uploading...</span>
                  <span style={{fontSize:'14px',fontWeight:'600',color:'#fe2c55'}}>{progress}%</span>
                </div>
                {/* Grey background bar */}
                <div style={{width:'100%',height:'6px',background:'#f1f1f2',borderRadius:'3px'}}>
                  {/* Red fill bar - width changes based on progress % */}
                  <div style={{
                    width:`${progress}%`,
                    height:'100%',
                    background:'#fe2c55',
                    borderRadius:'3px',
                    transition:'width 0.3s ease' // smooth animation
                  }}/>
                </div>
              </div>
            )}

            {/* Submit button */}
            <div style={{display:'flex',gap:'12px'}}>
              {/* Discard button goes back to feed */}
              <Link href="/feed" style={{
                flex:1,padding:'14px',
                border:'1px solid #e3e3e4',
                borderRadius:'4px',
                textAlign:'center',
                textDecoration:'none',
                color:'#161823',fontWeight:'600',fontSize:'15px',
                background:'#fff'
              }}>
                Discard
              </Link>

              {/* Post button submits the form */}
              <button
                onClick={handleSubmit}
                disabled={loading || !file} // disabled if no file or still uploading
                style={{
                  flex:1,padding:'14px',
                  background: (loading || !file) ? '#ccc' : '#fe2c55',
                  color:'white',border:'none',
                  borderRadius:'4px',
                  fontSize:'15px',fontWeight:'600',
                  cursor: (loading || !file) ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? `Uploading ${progress}%` : 'Post'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
