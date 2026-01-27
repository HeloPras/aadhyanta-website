"use client"
import React, { useState, useEffect } from "react"
import { X, ChevronRight, TrendingUp, Users, Building2 } from "lucide-react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: "sm" | "md" | "lg" | "xl"
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-transparent backdrop-blur-sm bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className={`relative bg-white rounded-lg shadow-2xl ${sizeClasses[size]} w-full max-h-[90vh] flex flex-col animate-slideUp`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold" style={{ color: "#161142" }}>
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" style={{ color: "#161142" }} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">{children}</div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

// Demo Component with Highlights
interface Highlight {
  title: string
  focus: string
  description: string
  features: string[]
}

const ModalDemo = ({ highlights }: { highlights: Highlight[] }) => {
  const [selectedHighlight, setSelectedHighlight] = useState<Highlight | null>(
    null,
  )

  const openModal = (highlight: Highlight) => {
    setSelectedHighlight(highlight)
  }

  const closeModal = () => {
    setSelectedHighlight(null)
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Highlights Grid */}
      <div className="space-y-4">
        {highlights.map((highlight, index) => (
          <div
            key={highlight.title}
            onClick={() => openModal(highlight)}
            className="space-y-6 max-w-7xl mx-auto"
          >
            <div
              key={index}
              className={`
          group relative pl-4 rounded-lg transition-all duration-300
          hover:bg-gray-50 cursor-pointer
          ${index < highlights.length - 1 ? "pb-6 border-b border-gray-100" : "pb-6"}
        `}
            >
              {/* Pink accent line */}
              <span
                className="
            absolute left-0 top-3 h-8  w-1 rounded-full
            bg-[#B71E52]/70
            transition-all duration-300
            group-hover:bg-[#B71E52]
            group-hover:top-0
            group-hover:h-full
          "
              />

              {/* Content */}
              <div className="transition-transform duration-300 group-hover:translate-x-1">
                <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                  {highlight.title}
                </h3>

                <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                  {highlight.focus}
                </p>
                <p className=" pt-2 text-sm  leading-relaxed text-[#B71E52] group-hover:underline group-hover:font-bold">
                  View Details
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>


      {/* Modal */}
      <Modal
        isOpen={selectedHighlight !== null}
        onClose={closeModal}
        title={selectedHighlight?.title || ""}
        size="lg"
      >
        {selectedHighlight && (
          <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header with Icon */}
            <div className="flex items-start gap-4">
              <div className="shrink-0 ">{selectedHighlight.focus}</div>
              <div className="flex-1">
                <p className="text-lg text-gray-600 leading-relaxed">
                  {selectedHighlight.description}
                </p>
              </div>
            </div>

            {/* Key Details */}
            <div className="grid md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg">
              <div>
                <div
                  className="text-sm font-semibold uppercase tracking-wide mb-2"
                  style={{ color: "#B71E52" }}
                >
                  Launched
                </div>
                <div className="text-lg font-bold" style={{ color: "#161142" }}>
                  {/* {selectedHighlight.details.launched} */}
                </div>
              </div>
              <div>
                <div
                  className="text-sm font-semibold uppercase tracking-wide mb-2"
                  style={{ color: "#B71E52" }}
                >
                  Investment
                </div>
                <div className="text-lg font-bold" style={{ color: "#161142" }}>
                  {/* {selectedHighlight.details.investment} */}
                </div>
              </div>
            </div>

            {/* Impact Metrics */}
            <div>
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: "#161142" }}
              >
              Features
              </h3>
              <ul className="space-y-3">
                {selectedHighlight.features.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <ChevronRight
                      className="w-5 h-5 mr-3 shrink-0 mt-0.5"
                      style={{ color: "#B71E52" }}
                    />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Objectives */}
            {/* <div>
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: "#161142" }}
              >
                Strategic Objectives
              </h3>
              <ul className="space-y-3">
                {selectedHighlight.features.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <ChevronRight
                      className="w-5 h-5 mr-3 shrink-0 mt-0.5"
                      style={{ color: "#B71E52" }}
                    />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div> */}

            {/* CTA Buttons */}
            {/* <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                className="px-6 py-3 rounded-lg text-white font-semibold transition-all duration-200 hover:shadow-lg inline-flex items-center justify-center"
                style={{ backgroundColor: "#B71E52" }}
              >
                Download Full Report
                <ChevronRight className="ml-2" size={18} />
              </button>
              <button
                className="px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-md border-2 inline-flex items-center justify-center"
                style={{ borderColor: "#161142", color: "#161142" }}
              >
                Contact Team
              </button>
            </div> */}
          </div>
        )}
      </Modal>
    </div>
  )
}

export default ModalDemo
