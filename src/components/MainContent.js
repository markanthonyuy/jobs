import React, { useState } from 'react'
import TimeAgo from 'react-timeago'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import Skeleton from '@material-ui/lab/Skeleton'
import PublicIcon from '@material-ui/icons/Public'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Alert from '@material-ui/lab/Alert'

function RenderSkeleton({ count = 10 }) {
  return [...Array(count)].map((_, i) => (
    <div className="card" key={i}>
      <figure>
        <Skeleton variant="circle" animation="wave" width={100} height={100} />
      </figure>
      <div className="body">
        <p>
          <Skeleton
            variant="rect"
            animation="wave"
            width={`${Math.floor(Math.random() * (20 - 50)) + 50}%`}
            height={15}
          />
        </p>
        <h2>
          <Skeleton
            variant="rect"
            animation="wave"
            width={`${Math.floor(Math.random() * (100 - 60)) + 60}%`}
            height={50}
          />
        </h2>

        <div className="meta">
          <Skeleton variant="rect" animation="wave" width={50} height={10} />
          <div className="post-meta">
            <Skeleton
              variant="rect"
              animation="wave"
              component="span"
              width={50}
              height={10}
            />
            <Skeleton
              variant="rect"
              animation="wave"
              component="span"
              width={50}
              height={10}
            />
          </div>
        </div>
      </div>
    </div>
  ))
}

function Card({ job }) {
  const [openDialog, setOpenDialog] = useState(false)

  const handleClose = () => {
    setOpenDialog(false)
  }

  return (
    <>
      <div className="card" onClick={() => setOpenDialog(true)}>
        <figure>
          <Avatar variant="rounded" src={job.company_logo}>
            {job.company.slice(0, 1)}
          </Avatar>
        </figure>
        <div className="body">
          {job.company_url ? (
            <p>
              <a href={job.company_url}>{job.company}</a>
            </p>
          ) : (
            <p>{job.company}</p>
          )}
          <h2>{job.title}</h2>

          <div className="meta">
            <Chip label={job.type} variant="outlined" />
            <div className="post-meta">
              <span>
                <PublicIcon fontSize="small" /> {job.location}
              </span>
              <span>
                <AccessTimeIcon fontSize="small" />{' '}
                <TimeAgo date={job.created_at} />
              </span>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby={job.title}
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          {job.title} | <span className="title-company"> {job.company}</span>
        </DialogTitle>
        <DialogContent dividers>
          <Avatar
            variant="rounded"
            src={job.company_logo}
            className="popup-avatar"
          >
            {job.company.slice(0, 1)}
          </Avatar>
          <div
            dangerouslySetInnerHTML={{ __html: job.description }}
            className="dialog-text"
          ></div>
          <h2>How to Apply</h2>
          <div
            dangerouslySetInnerHTML={{ __html: job.how_to_apply }}
            className="dialog-text"
          ></div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

function MainContent({ jobs, filter, loading }) {
  return (
    <aside className="content">
      {loading ? (
        <RenderSkeleton count={20} />
      ) : filter.length ? (
        filter.map((job, key) => <Card job={job} key={job.id} />)
      ) : jobs.length ? (
        jobs.map((job, key) => <Card job={job} key={job.id} />)
      ) : (
        <Alert severity="error">No Result</Alert>
      )}
    </aside>
  )
}

export default MainContent
