"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { BarrkehLogo } from "@/components/barrkeh-logo"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { loadUserData, saveUserData, exportUserData, importUserData, type UserData } from "@/lib/storage"
import { Settings, Download, Upload, Check, AlertCircle, User } from "lucide-react"
import { cn } from "@/lib/utils"

export default function SettingsPage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [exportStatus, setExportStatus] = useState<"idle" | "success" | "error">("idle")
  const [importStatus, setImportStatus] = useState<"idle" | "success" | "error">("idle")
  const [userName, setUserName] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const data = loadUserData()
    setUserData(data)
    setUserName(data.settings.userName)
  }, [])

  const handleExport = () => {
    try {
      const data = exportUserData()
      const blob = new Blob([data], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `barrkeh-ramadan-backup-${new Date().toISOString().split("T")[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      setExportStatus("success")
      setTimeout(() => setExportStatus("idle"), 3000)
    } catch {
      setExportStatus("error")
      setTimeout(() => setExportStatus("idle"), 3000)
    }
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      const success = importUserData(content)
      if (success) {
        setImportStatus("success")
        setUserData(loadUserData())
        setTimeout(() => setImportStatus("idle"), 3000)
      } else {
        setImportStatus("error")
        setTimeout(() => setImportStatus("idle"), 3000)
      }
    }
    reader.readAsText(file)
  }

  const handleSaveName = () => {
    if (!userData) return
    const updatedData = {
      ...userData,
      settings: { ...userData.settings, userName: userName.trim() },
    }
    saveUserData(updatedData)
    setUserData(updatedData)
  }

  const handleToggleSetting = (key: keyof UserData["settings"], value: boolean) => {
    if (!userData) return
    const updatedData = {
      ...userData,
      settings: { ...userData.settings, [key]: value },
    }
    saveUserData(updatedData)
    setUserData(updatedData)
  }

  if (!userData) {
    return (
      <PageWrapper>
        <div className="min-h-[60vh] flex items-center justify-center">
          <BarrkehLogo size={48} />
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      {/* Header */}
      <section className="py-6 text-center">
        <div className="w-32 h-px gold-gradient mx-auto mb-6 opacity-50" />
        <div className="h-14 w-14 rounded-full border border-primary/30 flex items-center justify-center mx-auto mb-4">
          <Settings className="h-7 w-7 text-primary" />
        </div>
        <h1 className="luxury-text text-sm gold-text mb-2">Settings</h1>
        <p className="font-serif text-xl text-foreground">Your Preferences</p>
        <div className="w-32 h-px gold-gradient mx-auto mt-6 opacity-50" />
      </section>

      {/* Profile */}
      <Card className="p-5 mb-4 bg-card/50 gold-border">
        <div className="flex items-center gap-3 mb-4">
          <User className="h-5 w-5 text-primary" />
          <h2 className="font-medium text-foreground">Profile</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-muted-foreground mb-2">Your Name</label>
            <div className="flex gap-2">
              <Input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
                className="flex-1 bg-[#0a0e1a] border-primary/20"
              />
              <Button
                onClick={handleSaveName}
                disabled={userName === userData.settings.userName}
                className="gold-gradient text-[#0a0e1a] border-0"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Display Settings */}
      <Card className="p-5 mb-4 bg-card/50 gold-border">
        <h2 className="font-medium text-foreground mb-4">Display</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-foreground">Show Hijri Date</p>
              <p className="text-xs text-muted-foreground">Display Islamic calendar date</p>
            </div>
            <Switch
              checked={userData.settings.showHijriDate}
              onCheckedChange={(checked) => handleToggleSetting("showHijriDate", checked)}
            />
          </div>
        </div>
      </Card>

      {/* Backup & Restore */}
      <Card className="p-5 mb-4 bg-card/50 gold-border">
        <h2 className="font-medium text-foreground mb-2">Backup & Restore</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Keep your Ramadan journey safe. Export your data to a file anytime.
        </p>

        <div className="space-y-3">
          <Button
            onClick={handleExport}
            className={cn(
              "w-full h-12 soft-press",
              exportStatus === "success"
                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                : "gold-gradient text-[#0a0e1a] border-0",
            )}
          >
            {exportStatus === "success" ? (
              <>
                <Check className="h-5 w-5 mr-2" />
                Exported Successfully
              </>
            ) : exportStatus === "error" ? (
              <>
                <AlertCircle className="h-5 w-5 mr-2" />
                Export Failed
              </>
            ) : (
              <>
                <Download className="h-5 w-5 mr-2" />
                Export My Ramadan
              </>
            )}
          </Button>

          <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />

          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className={cn(
              "w-full h-12 soft-press border-primary/30",
              importStatus === "success" && "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
              importStatus === "error" && "bg-red-500/20 text-red-400 border-red-500/30",
            )}
          >
            {importStatus === "success" ? (
              <>
                <Check className="h-5 w-5 mr-2" />
                Imported Successfully
              </>
            ) : importStatus === "error" ? (
              <>
                <AlertCircle className="h-5 w-5 mr-2" />
                Import Failed
              </>
            ) : (
              <>
                <Upload className="h-5 w-5 mr-2" />
                Import Backup
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* About */}
      <Card className="p-5 mb-4 bg-card/50 gold-border">
        <div className="text-center">
          <BarrkehLogo size={48} className="mx-auto mb-3" />
          <h2 className="luxury-text text-sm gold-text mb-1">Barrkeh DigiProducts</h2>
          <p className="text-xs text-muted-foreground mb-4">Premium Islamic Resources</p>
          <p className="text-sm text-muted-foreground">
            May this planner be a source of barakah for you and your family.
          </p>
        </div>
      </Card>

      {/* Footer */}
      <section className="text-center py-6">
        <div className="w-24 h-px gold-gradient mx-auto mb-4 opacity-30" />
        <p className="text-sm text-muted-foreground italic font-serif">"Your data, your journey, your privacy"</p>
        <div className="w-24 h-px gold-gradient mx-auto mt-4 opacity-30" />
      </section>
    </PageWrapper>
  )
}
