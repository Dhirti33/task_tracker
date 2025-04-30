import React, { ReactNode } from 'react';

interface FullScreenLayoutProps {
  children: ReactNode;
}

const FullScreenLayout: React.FC<FullScreenLayoutProps> = ({ children }) => { 

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      {/* Start Header */} 
      {/* End Header */}
      
       
       {/* Start Sidebar */}
       {/* End Sidebar */}
        
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main> 

    </div>
  );
};

export default FullScreenLayout;