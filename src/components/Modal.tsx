import { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const Modal = ({ isOpen, onClose, title, children, size = 'md' }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Desktop Modal */}
          <div className="hidden lg:flex fixed inset-0 z-[70] items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`bg-white dark:bg-secondary-dark rounded-2xl shadow-card dark:shadow-card-dark w-full ${sizes[size]} max-h-[90vh] overflow-y-auto`}
            >
              {title && (
                <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-secondary-dark-lighter sticky top-0 bg-white dark:bg-secondary-dark z-10">
                  <h2 className="text-xl font-semibold text-primary-dark dark:text-white">{title}</h2>
                  <button
                    onClick={onClose}
                    className="p-1 hover:bg-secondary dark:hover:bg-secondary-dark-lighter rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              )}
              <div className="p-6">{children}</div>
            </motion.div>
          </div>

          {/* Mobile Modal - Full Screen */}
          <div className="lg:hidden fixed inset-0 z-[70] flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-full h-full bg-white dark:bg-secondary-dark flex flex-col"
            >
              {/* Header Mobile - Fixed */}
              {title && (
                <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-100 dark:border-secondary-dark-lighter bg-white dark:bg-secondary-dark">
                  <h2 className="text-lg font-semibold text-primary-dark dark:text-white">{title}</h2>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-secondary dark:hover:bg-secondary-dark-lighter rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              )}
              
              {/* Content Mobile - Scrollable avec plus de padding bottom */}
              <div className="flex-1 overflow-y-auto overscroll-contain">
                <div className="p-4"> 
                  {children}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};