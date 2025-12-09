import { forwardRef } from 'react';
import { Award, GraduationCap } from 'lucide-react';

interface CertificateProps {
  studentName: string;
  courseName: string;
  completionDate: string;
  trainerName: string;
}

const Certificate = forwardRef<HTMLDivElement, CertificateProps>(
  ({ studentName, courseName, completionDate, trainerName }, ref) => {
    return (
      <div
        ref={ref}
        className="w-[800px] h-[600px] bg-gradient-to-br from-primary/5 via-background to-accent/5 p-8 relative overflow-hidden"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        {/* Border Design */}
        <div className="absolute inset-4 border-4 border-primary/30 rounded-lg" />
        <div className="absolute inset-6 border-2 border-accent/20 rounded-lg" />

        {/* Corner Decorations */}
        <div className="absolute top-8 left-8 w-16 h-16 border-t-4 border-l-4 border-primary rounded-tl-lg" />
        <div className="absolute top-8 right-8 w-16 h-16 border-t-4 border-r-4 border-primary rounded-tr-lg" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b-4 border-l-4 border-primary rounded-bl-lg" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b-4 border-r-4 border-primary rounded-br-lg" />

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-12">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
              <GraduationCap className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <span className="text-2xl font-bold tracking-tight">
                <span className="text-primary">OSTECH</span>
                <span className="text-foreground"> HUB</span>
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-primary mb-2 tracking-wide">
            CERTIFICATE OF COMPLETION
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-6" />

          {/* Body */}
          <p className="text-muted-foreground text-lg mb-4">
            This is to certify that
          </p>

          <h2 className="text-3xl font-bold text-foreground mb-4 border-b-2 border-primary/30 pb-2 px-8">
            {studentName}
          </h2>

          <p className="text-muted-foreground text-lg mb-4">
            has successfully completed the course
          </p>

          <h3 className="text-2xl font-semibold text-primary mb-6 max-w-lg">
            {courseName}
          </h3>

          <div className="flex items-center gap-2 text-accent mb-8">
            <Award className="w-6 h-6" />
            <span className="text-lg font-medium">With Excellence</span>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between w-full mt-auto pt-4">
            <div className="text-left">
              <p className="text-sm text-muted-foreground">Date of Completion</p>
              <p className="font-semibold text-foreground">{completionDate}</p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-2 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                <Award className="w-12 h-12 text-primary" />
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-muted-foreground">Instructor</p>
              <p className="font-semibold text-foreground">{trainerName}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Certificate.displayName = 'Certificate';

export default Certificate;
